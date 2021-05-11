import { Field } from "@comet/admin";
import { FinalFormTimePicker } from "@comet/admin-date-time";
import { Time } from "@comet/admin-icons";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Form } from "react-final-form";
import { IntlProvider } from "react-intl";

const initialValues = {};

const Story = () => {
    return (
        <IntlProvider messages={{}} locale="de">
            <Form onSubmit={() => {}} initialValues={initialValues}>
                {({ values }) => (
                    <>
                        <form style={{ width: 350 }}>
                            <Field
                                name="time1"
                                label="Time - default"
                                component={FinalFormTimePicker}
                                startAdornment={<Time />}
                                showClearButton
                                fullWidth
                            />
                        </form>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                    </>
                )}
            </Form>
        </IntlProvider>
    );
};

storiesOf("@comet/admin-date-time", module).add("Single Time Picker", () => <Story />);
