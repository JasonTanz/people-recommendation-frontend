import {
    StackProps,
    TypographyProps,
    TextFieldProps as MUITextFieldProps,
} from "@mui/material";

export type TextFieldProps = Omit<
    MUITextFieldProps,
    "onChange" | "error" | "onBlur"
> & {
    label?: string;
    textProps?: TypographyProps;
    containerProps?: StackProps;
    onChange?: () => void;
    value?: string;
    error?: any;
    onBlur?: () => void;
};
