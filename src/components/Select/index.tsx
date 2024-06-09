import {
    Stack,
    Select as MUISelect,
    Typography,
    MenuItem,
    FormHelperText,
} from "@mui/material";
import { SelectProps as Props } from "./props";
import { FieldError } from "react-hook-form";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Select: React.FC<Props> = (props) => {
    const {
        label = "Title",
        textProps,
        containerProps,
        onChange,
        onBlur,
        value,
        error,
        options,
        ...restProps
    } = props;

    // =============== RENDER FUNCTIONS
    const renderOptions = () => {
        return options.map((option, index: number) => {
            return (
                <MenuItem key={index} value={option.value}>
                    {option.label}
                </MenuItem>
            );
        });
    };
    // =============== VIEWS
    return (
        <Stack {...containerProps}>
            <Typography
                color="text.secondary"
                variant="body2"
                fontWeight={400}
                paddingBottom={"6px"}
                {...textProps}
            >
                {label}
            </Typography>
            <MUISelect
                {...restProps}
                onBlur={onBlur}
                error={!!error}
                onChange={onChange}
                value={value}
                size="small"
                sx={{ borderRadius: ".5rem" }}
            >
                {renderOptions()}
            </MUISelect>
            {error && (
                <FormHelperText error>
                    {(error as FieldError).message}
                </FormHelperText>
            )}
        </Stack>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Select;
