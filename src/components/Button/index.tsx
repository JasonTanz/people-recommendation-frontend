import { Button as MUIButton, CircularProgress } from "@mui/material";
import { ButtonProps as Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Button: React.FC<Props> = (props) => {
    const { children, loading = false, ...restProps } = props;

    // =============== RENDER FUNCTIONS
    const renderButtonContent = () => {
        if (!loading) return children;
        return <CircularProgress size={22} sx={{ my: 0.5 }} color="inherit" />;
    };

    // =============== VIEWS
    return (
        <MUIButton
            variant="contained"
            sx={{ borderRadius: ".8rem" }}
            {...restProps}
            disabled={loading}
        >
            {renderButtonContent()}
        </MUIButton>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Button;
