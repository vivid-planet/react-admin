import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { ClearInputButton, InputBase } from "@comet/admin";
import { ClickAwayListener, InputBaseProps, Paper, Popper, Typography } from "@material-ui/core";
import { format as formatDate, isValid as isValidDate, parse as parseDate } from "date-fns";
import * as React from "react";
import { DayPickerSingleDateController, DayPickerSingleDateControllerShape } from "react-dates";
import { FieldRenderProps } from "react-final-form";
import { useIntl } from "react-intl";

import { getDateControllerText } from "../utils/getDateControllerDate";
import { useStyles } from "./DatePicker.styles";

export interface DatePickerThemeProps extends InputBaseProps {
    numberOfMonths?: number;
    showClearButton?: boolean;
    dateControllerProps?: DayPickerSingleDateController;
    invalidValueMessage?: string;
    dateFormat?: string;
}

const Picker: React.FC<DatePickerThemeProps & FieldRenderProps<Date, HTMLInputElement>> = ({
    input,
    disabled,
    placeholder,
    fullWidth = false,
    showClearButton,
    dateControllerProps,
    inputProps,
    setValidationError,
    invalidValueMessage,
    dateFormat,
    ...restProps
}) => {
    const intl = useIntl();
    const classes = useStyles();

    const dateDisplayFormat = dateFormat
        ? dateFormat
        : intl.formatMessage({ id: "cometAdmin.dateTime.formFieldDateFormat", defaultMessage: "yyyy-MM-dd" });

    const placeholderText = placeholder
        ? placeholder
        : intl.formatMessage({ id: "cometAdmin.dateTime.datePicker.placeholder", defaultMessage: "Date" });

    const { value, onChange, onBlur, onFocus, ...restInput } = input;
    const rootRef = React.useRef(null);
    const [showPopper, setShowPopper] = React.useState<boolean>(false);
    const [showDayPicker, setShowDayPicker] = React.useState<boolean>(false);
    const [unvalidatedValue, setUnvalidatedValue] = React.useState<string | null>(null);
    const formattedValue = isValidDate(value) ? formatDate(value, dateDisplayFormat) : "";
    const displayValue = unvalidatedValue ? unvalidatedValue : formattedValue;
    const disableClearButton: boolean = !value && unvalidatedValue === null;

    const invalidValueText = invalidValueMessage
        ? invalidValueMessage
        : intl.formatMessage(
              {
                  id: "cometAdmin.dateTime.datePicker.invalidValue",
                  defaultMessage: 'Date must be formatted as "{dateFormat}"',
              },
              { dateFormat: dateDisplayFormat },
          );

    const showPicker = () => {
        setValidationError(null); // TODO: Find a less hacky way??
        onFocus();
        setShowPopper(true);

        // Wait for the popper to be rendered, so the picker-height can be calculated
        // correctly https://github.com/airbnb/react-dates/issues/46#issuecomment-255059933
        setTimeout(() => setShowDayPicker(true), 0);
    };

    const hidePicker = () => {
        onBlur();
        setShowPopper(false);
        setShowDayPicker(false);
    };

    const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;

        if (newValue) {
            const newDateValue = parseDate(newValue, dateDisplayFormat, new Date());

            if (isValidDate(newDateValue)) {
                onChange(newDateValue);
                setUnvalidatedValue(null);
            } else {
                setValidationError(invalidValueText); // TODO: Find a less hacky way??
            }
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidationError(null); // TODO: Find a less hacky way??

        const newValue = e.currentTarget.value;

        if (newValue) {
            setUnvalidatedValue(newValue);
        } else {
            onChange(null);
            setUnvalidatedValue(null);
        }
    };

    const onDateChange: DayPickerSingleDateControllerShape["onDateChange"] = (date) => {
        onChange(date ? date.toDate() : null);
        setUnvalidatedValue(null);
        hidePicker();
    };

    const onClearInput = () => {
        onChange(null);
        setUnvalidatedValue(null);
        setValidationError(null); // TODO: Find a less hacky way
    };

    const rootClasses: string[] = [classes.root];
    if (disabled) rootClasses.push(classes.disabled);
    if (fullWidth) rootClasses.push(classes.fullWidth);

    return (
        <ClickAwayListener onClickAway={hidePicker}>
            <div ref={rootRef} className={rootClasses.join(" ")}>
                <InputBase
                    classes={{ root: classes.inputBase }}
                    endAdornment={showClearButton ? <ClearInputButton onClick={() => onClearInput()} disabled={disableClearButton} /> : undefined}
                    disabled={disabled}
                    placeholder={placeholderText}
                    value={displayValue}
                    onFocus={showPicker}
                    onBlur={onInputBlur}
                    onChange={onInputChange}
                    inputProps={{
                        autoComplete: "off",
                        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Tab") {
                                // Hide picker, if tab is pressed. This cannot be done in `onBlur` because the input-blur-event is also called,
                                // when clicking inside the picker and the picker would be hidden, before `onDateChange` could be called.
                                hidePicker();
                            }
                        },
                        ...inputProps,
                    }}
                    {...restProps}
                    {...restInput}
                />
                <Popper open={showPopper} anchorEl={rootRef.current} placement="bottom-start" keepMounted className={classes.popper} disablePortal>
                    <Paper>
                        <Typography component={"div"}>
                            {showDayPicker && (
                                <DayPickerSingleDateController
                                    date={getDateControllerText(input.value)}
                                    onDateChange={onDateChange}
                                    initialVisibleMonth={null}
                                    onFocusChange={() => {}}
                                    hideKeyboardShortcutsPanel
                                    focused
                                    {...dateControllerProps}
                                />
                            )}
                        </Typography>
                    </Paper>
                </Popper>
            </div>
        </ClickAwayListener>
    );
};

export const FinalFormDatePicker = Picker;
