import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";

import { useFieldContainerStyles } from "../../form";
import { FilterBarField, FilterBarFieldProps } from "./FilterBarField";
import { FilterBarMoreFilters, FilterBarMoreFiltersProps } from "./FilterBarMoreFilters";

export type CometAdminFilterBarClassKeys = "root" | "barWrapper";

const useStyles = () => {
    const fieldContainerClasses = useFieldContainerStyles();

    return makeStyles<Theme, {}, CometAdminFilterBarClassKeys>(
        (theme: Theme) => {
            return {
                root: {
                    [`& [class*='${fieldContainerClasses.root}']`]: {
                        marginBottom: 0,
                    },
                },
                barWrapper: {
                    flexWrap: "wrap",
                    display: "flex",
                },
            };
        },
        { name: "CometAdminFilterBar" },
    )();
};

interface FilterBarComposition {
    MoreFilters: React.ComponentType<FilterBarMoreFiltersProps>;
    Field: React.ComponentType<FilterBarFieldProps>;
}

export const FilterBar: React.FunctionComponent & FilterBarComposition = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.barWrapper}>{children}</div>
        </div>
    );
};

FilterBar.MoreFilters = FilterBarMoreFilters;
FilterBar.Field = FilterBarField;
