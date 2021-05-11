import * as React from "react";
import { Field as FinalFormField, FieldRenderProps } from "react-final-form";

import { FieldContainer, FieldContainerThemeProps } from "./FieldContainer";

const requiredValidator = (value: any) => (value ? undefined : "Pflichtfeld");

const composeValidators = (...validators: Array<(value: any, allValues: object) => any>) => (value: any, allValues: object) =>
    validators.reduce((error, validator) => error || validator(value, allValues), undefined);

interface IVividFieldProps<FieldValue = any, T extends HTMLElement = HTMLElement> {
    name: string;
    label?: string;
    component?: React.ComponentType<any> | string;
    children?: (props: FieldRenderProps<FieldValue, T>) => React.ReactNode;
    required?: boolean;
    disabled?: boolean;
    validate?: (value: any, allValues: object) => any;
    variant?: FieldContainerThemeProps["variant"];
    [otherProp: string]: any;
}

interface State {
    validationError: null | string;
}

export class Field<FieldValue = any, T extends HTMLElement = HTMLElement> extends React.Component<IVividFieldProps<FieldValue, T>, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            validationError: null,
        };
    }

    public render() {
        const { children, component, name, label, required, validate, ...rest } = this.props;
        const composedValidate = required ? (validate ? composeValidators(requiredValidator, validate) : requiredValidator) : validate;
        return (
            <FinalFormField<FieldValue, FieldRenderProps<FieldValue, T>, T> name={name} validate={composedValidate} {...rest}>
                {this.renderField.bind(this)}
            </FinalFormField>
        );
    }

    private renderField({ input, meta, fieldContainerProps, ...rest }: FieldRenderProps<FieldValue, T>) {
        const { children, component, name, label, required, disabled, variant } = this.props;

        // TODO: Find a less hacky way??
        const setValidationError = (error: null | string) => {
            this.setState({
                validationError: error,
            });
        };

        function render() {
            if (component) {
                return React.createElement(component, { ...rest, input, meta, setValidationError });
            } else {
                if (typeof children !== "function") {
                    throw new Error(`Warning: Must specify either a render function as children, or a component prop to ${name}`);
                }
                return children({ input, meta });
            }
        }

        return (
            <FieldContainer
                label={label}
                required={required}
                disabled={disabled}
                error={
                    (meta.error || meta.submitError || this.state.validationError) &&
                    meta.touched &&
                    (meta.error || meta.submitError || this.state.validationError)
                }
                variant={variant}
            >
                {render()}
            </FieldContainer>
        );
    }
}
