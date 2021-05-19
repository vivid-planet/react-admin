import { Breadcrumbs, Stack, StackPage, StackSwitch, StackSwitchApiContext } from "@comet/admin";
import { CometColor } from "@comet/admin-icons";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import StoryRouter from "storybook-react-router";

function Page1() {
    const switchApi = React.useContext(StackSwitchApiContext);
    return (
        <>
            <button
                onClick={(e) => {
                    switchApi.activatePage("page2", "test");
                }}
            >
                activate page2
            </button>
        </>
    );
}

function Story() {
    return (
        <Stack topLevelTitle="Stack">
            <Breadcrumbs separator={<CometColor />} />
            <StackSwitch>
                <StackPage name="page1">
                    <Page1 />
                </StackPage>
                <StackPage name="page2">page2-2</StackPage>
            </StackSwitch>
        </Stack>
    );
}

function App() {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/foo" />
            </Route>
            <Route path="/foo">
                <Story />
            </Route>
        </Switch>
    );
}

storiesOf("@comet/admin/stack", module)
    .addDecorator(StoryRouter())
    .add("Stack Custom Separator", () => <App />);
