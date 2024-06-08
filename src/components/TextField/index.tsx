import { TextField as MUITextField, Stack, Typography } from "@mui/material";
import { TextFieldProps as Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const TextField: React.FC<Props> = (props) => {
    const {
        label = "Title",
        textProps,
        containerProps,
        onChange,
        onBlur,
        value,
        error,
        ...restProps
    } = props;

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
            <MUITextField
                variant="outlined"
                size="small"
                {...restProps}
                InputProps={{ sx: { borderRadius: ".5rem" } }}
                error={!!error}
                onChange={onChange}
                onBlur={onBlur}
                helperText={error ? error.message : null}
                fullWidth
                value={value}
            />
        </Stack>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default TextField;
