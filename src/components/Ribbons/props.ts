import { StackProps } from "@mui/material";

export type RibbonProps = StackProps & {
    label?: string;
    backgroundColor?: string;
    color?: string;
};
