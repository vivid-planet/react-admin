import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache, useQuery } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ErrorDialogOptions, ErrorDialogProvider, ErrorScope, errorScopeForOperationContext, useErrorDialog } from "@comet/admin";
import { Typography } from "@material-ui/core";
import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import gql from "graphql-tag";
import * as React from "react";

const Story: React.FunctionComponent = () => {
    const query = gql`
        ${text("GQL Query", "query StarWarsPeople {allPeople { people { id name birthYear gender homeworld{ name } } }}")}
    `;

    const { data, error } = useQuery(query);

    return <Typography>{JSON.stringify(data)}</Typography>;
};

const CustomApolloProvider: React.FunctionComponent = ({ children }) => {
    const errorDialog = useErrorDialog();

    const link = ApolloLink.from([
        onError(({ graphQLErrors, networkError, operation }) => {
            if (errorDialog) {
                const errorScope = errorScopeForOperationContext(operation.getContext());

                if (graphQLErrors) {
                    graphQLErrors.forEach(({ extensions, message }) => {
                        if (errorScope === ErrorScope.Global) {
                            const errorDialogOptions: ErrorDialogOptions = { error: message };
                            console.log("## message: ", errorDialog, errorDialogOptions);
                            errorDialog.showError(errorDialogOptions);
                        }
                    });
                } else if (networkError) {
                    if (errorScope === ErrorScope.Global) {
                        errorDialog.showError({ error: networkError.message });
                    }
                }
            }
        }),
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
