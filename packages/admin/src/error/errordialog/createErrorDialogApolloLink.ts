import { onError } from "@apollo/client/link/error";

import { ErrorDialogOptions } from "./ErrorDialog";
import { ErrorDialogContextProps } from "./ErrorDialogContext";
import { ErrorScope, errorScopeForOperationContext } from "./ErrorScope";

export interface ErrorDialogApolloLinkOptions {
    errorDialog: ErrorDialogContextProps;
}
export const createErrorDialogApolloLink = ({ errorDialog }: ErrorDialogApolloLinkOptions) => {
    return onError(({ graphQLErrors, networkError, operation }) => {
        if (errorDialog) {
            const errorScope = errorScopeForOperationContext(operation.getContext());

            if (graphQLErrors) {
                graphQLErrors.forEach(({ extensions, message }) => {
                    if (errorScope === ErrorScope.Global) {
                        const errorDialogOptions: ErrorDialogOptions = { error: message };
                        console.log("message: ", errorDialog, errorDialogOptions);
                        errorDialog.showError(errorDialogOptions);
                    }
                });
            } else if (networkError) {
                if (errorScope === ErrorScope.Global) {
                    errorDialog.showError({ error: networkError.message });
                }
            }
        }
    });
};
