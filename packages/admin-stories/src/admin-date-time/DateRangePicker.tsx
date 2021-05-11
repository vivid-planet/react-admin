import { Field } from "@comet/admin";
import { DateRangePickerValue, FinalFormDateRangePicker } from "@comet/admin-date-time";
import { Calendar } from "@comet/admin-icons";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Form } from "react-final-form";
import { IntlProvider } from "react-intl";

const startDate = new Date();
const endDate = new Date();

startDate.setDate(startDate.getDate() + 2);
endDate.setDate(startDate.getDate() + 4);

const range: DateRangePickerValue = { start: startDate, end: endDate };
const initialValues = { date2: range, date3: range, date4: range };

const Story = () => {
    return (
        <IntlProvider messages={{}} locale="de">
            <Form onSubmit={() => {}} initialValues={initialValues}>
                {() => (
                    <form style={{ width: 350 }}>
                        <Field name="date1" label="Date" component={FinalFormDateRangePicker} fullWidth />
                        <Field
                            name="date2"
                            label="Date, with icons"
                            component={FinalFormDateRangePicker}
                            startAdornment={<Calendar />}
                            endAdornment={<Calendar />}
                        />
                        <Field name="date3" label="Date, with clear-button" component={FinalFormDateRangePicker} showClearButton />
                        <Field name="date4" label="Date, required" required component={FinalFormDateRangePicker} startAdornment={<Calendar />} />
                        <Field name="date5" label="Date, disabled" disabled component={FinalFormDateRangePicker} />
                    </form>
                )}
            </Form>
        </IntlProvider>
    );
};

storiesOf("@comet/admin-date-time", module).add("Date Range Picker", () => <Story />);
