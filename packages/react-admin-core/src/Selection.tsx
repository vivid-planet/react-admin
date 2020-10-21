import * as React from "react";
import { DirtyHandlerApiContext, IDirtyHandlerApi } from "./DirtyHandlerApiContext";
import { ISelectionApi } from "./SelectionApi";

export interface ISelectionRenderPropArgs {
    selectedId?: string;
    phantom?: boolean;
    selectionApi: ISelectionApi;
}
interface IProps {
    children: (injectedProps: ISelectionRenderPropArgs) => React.ReactNode;
}
interface IState {
    selectedId?: string;
    phantom?: boolean;
}
export class Selection extends React.Component<IProps, IState> {
    private selectionApi: ISelectionApi;
    private dirtyHandlerApi?: IDirtyHandlerApi;

    constructor(props: IProps) {
        super(props);

        this.state = {
            selectedId: undefined,
            phantom: undefined,
        };

        this.selectionApi = {
            handleSelectId: this.handleSelectId.bind(this),
            handleDeselect: this.handleDeselect.bind(this),
            handleAdd: this.handleAdd.bind(this),
        };
    }

    public handleSelectId(id: string) {
        this.setState({ selectedId: id, phantom: false });
    }

    public handleDeselect() {
        this.setState({ selectedId: undefined, phantom: undefined });
    }

    public handleAdd() {
        this.setState({ selectedId: undefined, phantom: true });
    }

    public render() {
        return this.props.children({
            selectedId: this.state.selectedId,
            phantom: this.state.phantom,
            selectionApi: this.selectionApi,
        });
    }
}
