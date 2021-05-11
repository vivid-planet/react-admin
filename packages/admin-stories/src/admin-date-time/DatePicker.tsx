import { Field } from "@comet/admin";
import { FinalFormDatePicker } from "@comet/admin-date-time";
import { Calendar } from "@comet/admin-icons";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Form } from "react-final-form";
import { IntlProvider } from "react-intl";

const today = new Date();

const initialValues = {
    date2: today,
    date3: today,
    date4: today,
};

const Story = () => {
    return (
        <IntlProvider messages={{}} locale="de">
            <Form onSubmit={() => {}} initialValues={initialValues}>
                {() => (
                    <form style={{ width: 350 }}>
                        <Field name="date1" label="Date" component={FinalFormDatePicker} fullWidth />
                        <Field name="date2" label="Date, with icon" component={FinalFormDatePicker} endAdornment={<Calendar />} />
                        <Field name="date3" label="Date, with clear-button" component={FinalFormDatePicker} showClearButton />
                        <Field name="date4" label="Date, required" required component={FinalFormDatePicker} startAdornment={<Calendar />} />
                        <Field name="date5" label="Date, disabled" disabled component={FinalFormDatePicker} />
                    </form>
                )}
            </Form>
        </IntlProvider>
    );
};

storiesOf("@comet/admin-date-time", module).add("Date Picker", () => <Story />);
