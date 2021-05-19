import { Box, Dialog, Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Error, KeyboardArrowDown } from "@material-ui/icons";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface ErrorDialogOptions {
    error: string;
    title?: string;
    userMessage?: string;
}

export type ErrorMethods = {
    setError: (options: ErrorDialogOptions) => void;
};

export interface ErrorProps {
    errorOptions: ErrorDialogOptions;
}

const ErrorDialog: React.FunctionComponent<ErrorProps> = ({ errorOptions }) => {
    const intl = useIntl();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    // Destructuring and default values
    const {
        title = intl.formatMessage({ id: "comet.errorDialog.title", defaultMessage: "Error" }),
        userMessage = intl.formatMessage({ id: "comet.errorDialog.abstractUserMessage", defaultMessage: "An error occured" }),
        error,
    } = errorOptions;

    return (
        <Dialog open={true} fullScreen={fullScreen}>
            <DialogTitle>
                <Box display={"flex"} flexDirection={"row"}>
                    <Error />
                    <Typography>{title}</Typography>
                </Box>
            </DialogTitle>
            <DialogContent style={{ minWidth: 300 }}>
                <DialogContentText>
                    {userMessage}
                    {process.env.NODE_ENV === "development" && (
                        <Accordion>
                            <AccordionSummary expandIcon={<KeyboardArrowDown />}>
                                <FormattedMessage id={"comet.errorDialog.Details"} defaultMessage={"Details"} />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{error}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary">
                    <FormattedMessage id="comet.generic.ok" defaultMessage="Ok" />
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ForwardedErrorDialog = React.forwardRef(ErrorDialog);
export default ForwardedErrorDialog;

export type ErrorDialogComponentRefType = React.ElementRef<typeof ForwardedErrorDialog>;
