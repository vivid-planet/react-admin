import MuiInputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import styled from "@vivid-planet/react-admin-mui/styled-components";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";

const InputBase = styled<InputBaseProps & FieldRenderProps>(({ input, ...props }) => (
    <MuiInputBase classes={{ root: "root", focused: "focused" }} {...props} {...input} />
))`
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
export default InputBase;