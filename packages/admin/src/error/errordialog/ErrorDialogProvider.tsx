import * as React from "react";

import ErrorDialog, { ErrorDialogOptions } from "./ErrorDialog";
import { ErrorDialogContext } from "./ErrorDialogContext";

const RenderCounter = () => {
    const renderCount = React.useRef(0);
    renderCount.current = renderCount.current + 1;
    return <div>RenderCount: {JSON.stringify(renderCount)}</div>;
};

export const ErrorDialogProvider: React.FunctionComponent = ({ children }) => {
    const [errorOptions, setErrorOptions] = React.useState<ErrorDialogOptions | null>(null);

    const ChildrenContainer = React.memo(({ children }) => {
        return <>{children}</>;
    });

    const showError = (options: ErrorDialogOptions) => {
        setErrorOptions(options);
    };

    return (
        <>
            <RenderCounter />
            <ErrorDialogContext.Provider value={{ showError }}>
                <ChildrenContainer>{children}</ChildrenContainer>
                {errorOptions && <ErrorDialog errorOptions={errorOptions} />}
            </ErrorDialogContext.Provider>
        </>
    );
};
