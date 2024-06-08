import {
    StackProps,
    TypographyProps,
    SelectProps as MUISelectProps,
} from "@mui/material";

export type SelectProps = Omit<
    MUISelectProps,
    "onChange" | "error" | "onBlur"
> & {
    label?: string;
    textProps?: TypographyProps;
    containerProps?: StackProps;
    onChange?: () => void;
    value?: string;
    error?: any;
    onBlur?: () => void;
    options: Record<string, string>[];
};
