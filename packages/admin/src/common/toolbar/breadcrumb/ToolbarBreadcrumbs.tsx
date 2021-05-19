import { Link, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

import { StackApiContext } from "../../../stack/Api";
import { ToolbarItem } from "../item/ToolbarItem";
import { useThemeProps } from "./ToolbarBreadcrumbs.styles";

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(({ href, to, ...rest }, ref) => (
    <RouterLink innerRef={ref} to={to ?? href} {...rest} />
));

export const ToolbarBreadcrumbs: React.FunctionComponent = () => {
    const themeProps = useThemeProps();

    return (
        <StackApiContext.Consumer>
            {(stackApi) => {
                return (
                    <>
                        {stackApi?.breadCrumbs.map(({ id, url, title }) => {
                            return (
                                <ToolbarItem key={id}>
                                    <Link to={url} component={BreadcrumbLink} color={"inherit"}>
                                        <Typography {...themeProps.typographyProps}>{title}</Typography>
                                    </Link>
                                </ToolbarItem>
                            );
                        })}
                    </>
                );
            }}
        </StackApiContext.Consumer>
    );
};
