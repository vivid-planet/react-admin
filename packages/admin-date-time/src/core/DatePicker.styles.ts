import { makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import zIndex from "@material-ui/core/styles/zIndex";

export type CometAdminDatePickerClassKeys = "root" | "fullWidth" | "disabled" | "inputBase" | "popper";

export const useStyles = makeStyles<Theme, {}, CometAdminDatePickerClassKeys>(
    () => ({
        root: {
            position: "relative",
            display: "inline-block",
            width: 180,
        },
        fullWidth: {
            display: "block",
            width: "100%",
        },
        disabled: {},
        inputBase: {
            width: "100%",
        },
        popper: {
            zIndex: zIndex.modal,
            "& [class*='MuiPaper-root']": {
                overflowX: "auto",
            },
        },
    }),
    { name: "CometAdminDatePicker" },
);
