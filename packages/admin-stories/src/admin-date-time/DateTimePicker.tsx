import { Field } from "@comet/admin";
import { FinalFormDateTimePicker } from "@comet/admin-date-time";
import { Calendar, Time } from "@comet/admin-icons";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Form } from "react-final-form";
import { IntlProvider } from "react-intl";

const today = new Date();

const initialValues = {
    datetime2: today,
    datetime3: today,
};

const Story = () => {
    return (
        <IntlProvider messages={{}} locale="de">
            <Form onSubmit={() => {}} initialValues={initialValues}>
                {({ values }) => (
                    <>
                        <form style={{ width: 350 }}>
                            <Field
                                name="datetime1"
                                dateInputLabel={"Date"}
                                timeInputLabel={"Time"}
                                component={FinalFormDateTimePicker}
                                datePickerProps={{ endAdornment: <Calendar /> }}
                                timePickerProps={{ endAdornment: <Time /> }}
                                fullWidth
                            />
                            <Field name="datetime2" label={"Date & Time"} component={FinalFormDateTimePicker} />
                            <Field name="datetime3" label={"Date & Time"} component={FinalFormDateTimePicker} required />
                            <Field name="datetime4" dateInputLabel={"Date"} timeInputLabel={"Time"} component={FinalFormDateTimePicker} disabled />
                        </form>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                    </>
                )}
            </Form>
        </IntlProvider>
    );
};

storiesOf("@comet/admin-date-time", module).add("Date-Time Picker", () => <Story />);
