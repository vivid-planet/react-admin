import { addDays, addMinutes, eachMinuteOfInterval, format as formatDate } from "date-fns";

export interface TimeOption {
    label: string;
    value: string | null;
}

export const timeFormatForDatabaseStorage = "HH:mm";

export const getTimeRangeOptions = (minuteStep: number, timeFormat: string): TimeOption[] => {
    const startDate = new Date();
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);

    const endDate = addMinutes(addDays(startDate, 1), -minuteStep);

    const dateRangeInterval: Date[] = eachMinuteOfInterval(
        {
            start: startDate,
            end: endDate,
        },
        { step: minuteStep },
    );

    return dateRangeInterval.map((date: Date) => {
        return {
            label: formatDate(date, timeFormat),
            value: formatDate(date, timeFormatForDatabaseStorage),
        };
    });
};
