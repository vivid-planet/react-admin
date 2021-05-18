import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { createErrorDialogApolloLink, ErrorDialogProvider, Table, TableQuery, useErrorDialog, useTableQuery } from "@comet/admin";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import gql from "graphql-tag";
import * as React from "react";

interface People {
    id: string;
    name: string;
    birthYear: string;
    gender: string;
    homeworld: {
        name: string;
    };
}
interface QueryData {
    allPeople: {
        people: People[];
    };
}

const Story: React.FunctionComponent = () => {
    const query = gql`
        ${text("GQL Query", "query StarWarsPeople {allPeople { people { id name birthYear gender homeworld{ name } } }}")}
    `;

    const { tableData, api, loading, error } = useTableQuery<QueryData, {}>()(query, {
        resolveTableData: (data) => ({
            data: data.allPeople.people,
            totalCount: data.allPeople.people.length,
        }),
        globalErrorHandling: true,
    });

    return (
        <TableQuery api={api} loading={loading} error={error}>
            {tableData && (
                <Table
                    {...tableData}
                    columns={[
                        {
                            name: "id",
                            header: "Id",
                        },
                        {
                            name: "name",
                            header: "Name",
                        },
                        {
                            name: "birthYear",
                            header: "Birthyear",
                        },
                        {
                            name: "gender",
                            header: "Gender",
                        },
                        {
                            name: "homeworld.name",
                            header: "Homeworld",
                        },
                    ]}
                />
            )}
        </TableQuery>
    );
};

const CustomApolloProvider: React.FunctionComponent = ({ children }) => {
    const errorDialog = useErrorDialog();

    const link = ApolloLink.from([
        createErrorDialogApolloLink({ errorDialog }),
        createHttpLink({
            uri: `https://swapi-graphql.netlify.app/.netlify/functions/index`, // Test API here: https://graphql.org/swapi-graphql
        }),
    ]);
    const cache = new InMemoryCache();

    const apolloClient = new ApolloClient({
        link,
        cache,
    });
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
storiesOf("@comet/admin/table", module).add("EndlessError", () => (
    <ErrorDialogProvider>
        <CustomApolloProvider>
            <Story />
        </CustomApolloProvider>
    </ErrorDialogProvider>
));
