import { InputBase } from "@comet/admin";
import { ClearInputButton } from "@comet/admin/lib/common/ClearInputButton";
import { ClickAwayListener, InputBaseProps, List, ListItem, ListItemText, Paper, Popper } from "@material-ui/core";
import { format as formatDate, isValid as isValidDate, parse as parseDate } from "date-fns";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { useIntl } from "react-intl";

import { getTimeRangeOptions, timeFormatForDatabaseStorage, TimeOption } from "../utils/helper";
import { useStyles } from "./TimePicker.styles";

export interface TimePickerProps extends InputBaseProps {
    minuteStep?: number;
    emptyOptionLabel?: string;
    invalidValueMessage?: string;
    showClearButton?: boolean;
    timeFormat?: string;
}

const Picker: React.FC<TimePickerProps & FieldRenderProps<string, HTMLInputElement>> = ({
    input,
    disabled,
    placeholder,
    emptyOptionLabel,
    minuteStep = 15,
    fullWidth = false,
    showClearButton,
    setValidationError,
    invalidValueMessage,
    timeFormat,
    ...restProps
}) => {
    const intl = useIntl();
    const classes = useStyles();

    const displayTimeFormat = timeFormat
        ? timeFormat
        : intl.formatMessage({ id: "cometAdmin.dateTime.formFieldTimeFormat", defaultMessage: "HH:mm" });

    const placeholderText = placeholder
        ? placeholder
        : intl.formatMessage({ id: "cometAdmin.dateTime.timePicker.placeholder", defaultMessage: "Time" });

    const emptyOptionLabelText = emptyOptionLabel
        ? emptyOptionLabel
        : intl.formatMessage({ id: "cometAdmin.dateTime.timePicker.emptyOption", defaultMessage: "No Selection" });

    const { value: inputValue, onChange, onBlur, onFocus, ...restInput } = input;

    const rootRef = React.useRef<HTMLDivElement>(null);
    const paperRef = React.useRef<HTMLDivElement>(null);
    const selectedOptionRef = React.useRef<HTMLDivElement>(null);
    const [showPopper, setShowPopper] = React.useState<boolean>(false);
    const [unvalidatedValue, setUnvalidatedValue] = React.useState<string | null>(null);
    const [timeOptions, setTimeOptions] = React.useState<TimeOption[]>([]);
    const [renderedTimeOptionsList, setRenderedTimeOptionsList] = React.useState<React.ReactElement | null>(null);

    const parsedInputValue: Date | null = inputValue ? parseDate(inputValue, timeFormatForDatabaseStorage, new Date()) : null;
    const formattedValue = parsedInputValue && isValidDate(parsedInputValue) ? formatDate(parsedInputValue, displayTimeFormat) : "";
    const displayValue = unvalidatedValue === null ? formattedValue : unvalidatedValue;
    const disableClearButton: boolean = !inputValue && unvalidatedValue === null;

    const invalidValueText = invalidValueMessage
        ? invalidValueMessage
        : intl.formatMessage(
              {
                  id: "cometAdmin.dateTime.timePicker.invalidValue",
                  defaultMessage: 'Time must be formatted as "{timeFormat}"',
              },
              { timeFormat: displayTimeFormat },
          );

    React.useEffect(() => {
        setTimeOptions([
            {
                label: emptyOptionLabelText,
                value: null,
            },
            ...getTimeRangeOptions(minuteStep, displayTimeFormat),
        ]);
    }, [emptyOptionLabelText, minuteStep, displayTimeFormat, setTimeOptions]);

    React.useEffect(() => {
        const onListItemClicked = (value: string | null) => {
            if (value === null) {
                setUnvalidatedValue(null);
            } else {
                const newValue = parseDate(value, timeFormatForDatabaseStorage, new Date());
                setUnvalidatedValue(formatDate(newValue, displayTimeFormat));
            }

            setShowPopper(false);
        };

        // Rendering this in `useEffect` only once prevents lag, it prevents rendering ~100 list-items every time the user types something into the input
        setRenderedTimeOptionsList(
            <List>
                {timeOptions.map(({ label, value }, index) => {
                    const selected = value === inputValue;
                    return (
                        <ListItem
                            key={index}
                            button
                            dense
                            selected={selected}
                            ref={selected ? selectedOptionRef : undefined}
                            onMouseDown={() => onListItemClicked(value)}
                        >
                            <ListItemText>{label}</ListItemText>
                        </ListItem>
                    );
                })}
            </List>,
        );
    }, [timeOptions, inputValue, selectedOptionRef, displayTimeFormat]);

    const setValue = (date: Date | null) => {
        setValidationError(null); // TODO: Find a less hacky way??

        if (!date) {
            onChange(null);
            setUnvalidatedValue(null);
        } else if (isValidDate(date)) {
            onChange(formatDate(date, timeFormatForDatabaseStorage));
            setUnvalidatedValue(null);
        } else {
            setValidationError(invalidValueText); // TODO: Find a less hacky way??
        }
    };

    const onInputTextChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidationError(null); // TODO: Find a less hacky way??
        setUnvalidatedValue(e.currentTarget.value);
    };

    const onInputFocus = () => {
        setShowPopper(true);
        onFocus();

        // Timeout is required, to make sure, the options have been rendered before scrolling to the option
        setTimeout(() => {
            if (paperRef.current && selectedOptionRef.current) {
                // Scroll to selected option (with one option-space above)
                paperRef.current.scrollTo({ top: selectedOptionRef.current.offsetTop - selectedOptionRef.current.clientHeight, behavior: "smooth" });
            }
        }, 0);
    };

    const onInputBlur = () => {
        setShowPopper(false);
        onBlur();

        if (unvalidatedValue !== null) {
            if (unvalidatedValue.trim() === "") {
                setValue(null);
            } else {
                setValue(parseDate(unvalidatedValue, displayTimeFormat, new Date()));
            }
        }
    };

    const hidePicker = () => {
        setShowPopper(false);
        onBlur();
    };

    const rootClasses: string[] = [classes.root];
    if (disabled) rootClasses.push(classes.disabled);
    if (fullWidth) rootClasses.push(classes.fullWidth);

    return (
        <ClickAwayListener onClickAway={hidePicker}>
            <div ref={rootRef} className={rootClasses.join(" ")}>
                <InputBase
                    classes={{ root: classes.inputBase }}
                    endAdornment={showClearButton ? <ClearInputButton onClick={() => setValue(null)} disabled={disableClearButton} /> : undefined}
                    placeholder={placeholderText}
                    disabled={disabled}
                    value={displayValue}
                    onChange={onInputTextChanges}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    inputProps={{
                        autoComplete: "off",
                    }}
                    {...restProps}
                    {...restInput}
                />
                <Popper open={showPopper} anchorEl={rootRef.current} placement="bottom-start" keepMounted className={classes.popper}>
                    <Paper ref={paperRef}>{renderedTimeOptionsList}</Paper>
                </Popper>
            </div>
        </ClickAwayListener>
    );
};

export const FinalFormTimePicker = Picker;
