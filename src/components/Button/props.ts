import { ButtonProps as MUIButtonProps } from "@mui/material";
import { ReactNode } from "react";
export type ButtonProps = MUIButtonProps & {
    text?: string;
    loading?: boolean;
    children?: ReactNode;
};
