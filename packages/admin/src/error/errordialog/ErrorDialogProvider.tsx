import * as React from "react";

import ErrorDialog, { ErrorDialogOptions } from "./ErrorDialog";
import { ErrorDialogContext, ErrorDialogContextProps } from "./ErrorDialogContext";

const RenderCounter = () => {
    const renderCount = React.useRef(0);
    renderCount.current = renderCount.current + 1;
    return <div>RenderCount: {JSON.stringify(renderCount)}</div>;
};

const ChildrenContainer = React.memo(({ children }) => {
    return <>{children}</>;
});

export const ErrorDialogProvider: React.FunctionComponent = ({ children }) => {
    const [errorOptions, setErrorOptions] = React.useState<ErrorDialogOptions | null>(null);

    const errorDialog = React.useMemo((): ErrorDialogContextProps => {
        return {
            showError: (options: ErrorDialogOptions) => {
                setErrorOptions(options);
            },
        };
    }, [setErrorOptions]);

    return (
        <>
            <RenderCounter />
            <ErrorDialogContext.Provider value={errorDialog}>
                <ChildrenContainer>{children}</ChildrenContainer>
                {errorOptions && <ErrorDialog errorOptions={errorOptions} />}
            </ErrorDialogContext.Provider>
        </>
    );
};
