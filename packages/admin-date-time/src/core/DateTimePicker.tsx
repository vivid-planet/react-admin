import { FormControl, FormLabel, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { format as formatDate, isValid as isValidDate, parse as parseDate } from "date-fns";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { useIntl } from "react-intl";

import { timeFormatForDatabaseStorage } from "../utils/helper";
import { DatePickerThemeProps, FinalFormDatePicker } from "./DatePicker";
import styles from "./DateTimePicker.styles";
import { FinalFormTimePicker, TimePickerProps } from "./TimePicker";

export interface DateTimePickerProps {
    fullWidth?: boolean;
    placeholder?: string;
    dateInputLabel?: string;
    timeInputLabel?: string;
    datePickerProps?: DatePickerThemeProps;
    timePickerProps?: TimePickerProps;
}

const DateTime: React.FC<WithStyles<typeof styles> & DateTimePickerProps & FieldRenderProps<string | Date, HTMLInputElement>> = ({
    classes,
    input,
    fullWidth = false,
    meta,
    dateInputLabel,
    timeInputLabel,
    disabled,
    datePickerProps,
    timePickerProps,
}) => {
    const { onChange, ...otherInput } = input;

    const intl = useIntl();
    const dateFormat = intl.formatMessage({ id: "cometAdmin.dateTime.formFieldDateFormat", defaultMessage: "yyyy-MM-dd" });
    const inputIsValidDate = input.value && isValidDate(input.value);

    const onDateChange = (newDateValue: Date | null) => {
        if (!newDateValue) {
            onChange(null);
        } else {
            if (inputIsValidDate && input.value instanceof Date) {
                newDateValue.setHours(input.value.getHours());
                newDateValue.setMinutes(input.value.getMinutes());
                newDateValue.setSeconds(input.value.getSeconds());
            } else {
                newDateValue.setHours(0);
                newDateValue.setMinutes(0);
                newDateValue.setSeconds(0);
            }

            onChange(newDateValue);
        }
    };

    const onTimeChange = (newTimeValue: string | null) => {
        if (!newTimeValue) {
            onChange(null);
        } else {
            const newDateValue: Date = inputIsValidDate && input.value instanceof Date ? input.value : new Date();
            const timeDateValue = parseDate(newTimeValue, timeFormatForDatabaseStorage, new Date());

            newDateValue.setHours(timeDateValue.getHours());
            newDateValue.setMinutes(timeDateValue.getMinutes());
            newDateValue.setSeconds(timeDateValue.getSeconds());

            onChange(newDateValue);
        }
    };

    const dateValue: Date | null = inputIsValidDate && input.value instanceof Date ? input.value : null;
    const timeValue: string | null = dateValue ? formatDate(dateValue, timeFormatForDatabaseStorage) : null;

    const rootClasses: string[] = [classes.root];
    if (disabled) rootClasses.push(classes.disabled);
    if (fullWidth) rootClasses.push(classes.fullWidth);

    return (
        <div className={rootClasses.join(" ")}>
            <FormControl classes={{ root: classes.date }}>
                {dateInputLabel && <FormLabel disabled={disabled}>{dateInputLabel}</FormLabel>}
                <FinalFormDatePicker
                    input={{ ...otherInput, onChange: onDateChange, value: dateValue }}
                    meta={meta}
                    disabled={disabled}
                    fullWidth
                    {...datePickerProps}
                />
            </FormControl>
            <FormControl classes={{ root: classes.time }}>
                {dateInputLabel && <FormLabel disabled={disabled}>{timeInputLabel}</FormLabel>}
                <FinalFormTimePicker
                    input={{ ...otherInput, onChange: onTimeChange, value: timeValue }}
                    meta={meta}
                    disabled={disabled}
                    fullWidth
                    {...timePickerProps}
                />
            </FormControl>
        </div>
    );
};

export const FinalFormDateTimePicker = withStyles(styles, { name: "CometAdminDateTimePicker" })(DateTime);
