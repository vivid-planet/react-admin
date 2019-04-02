import MuiInputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import { styledComponents as styled } from "@vivid-planet/react-admin-mui";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";

export const StyledInput = styled<InputBaseProps>(({ ...props }) => <MuiInputBase classes={{ root: "root", focused: "focused" }} {...props} />)`
    &.root {
        border: 1px solid #d8dbdf;
        border-radius: 2px;
        background-color: #ffffff;
        padding: 0px 10px;
    }
    textarea {
        padding: 6px 0px 8px 0;
    }
    &.root.focused {
        border-color: #0081b8;
    }
`;

const Input: React.FunctionComponent<InputBaseProps & FieldRenderProps> = ({ meta, input, innerRef, ...props }) => (
    <StyledInput {...input} {...props} />
);
export default Input;
