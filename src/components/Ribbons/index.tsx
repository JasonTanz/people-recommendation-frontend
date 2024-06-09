import { Stack, Typography } from "@mui/material";
import { RibbonProps as Props } from "./props";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Ribbons: React.FC<Props> = (props) => {
    const {
        label = "Label",
        backgroundColor = "#ff4133",
        color = "white",
    } = props;

    // =============== VIEWS
    return (
        <Stack
            sx={{
                color,
                backgroundColor,
                position: "absolute",
                right: "-97px",
                top: "-74px",
                width: "100%",
                transform: "rotate(45deg)",
                padding: "12px",
                textAlign: "center",
            }}
        >
            <Typography fontWeight={600}>{label}</Typography>
        </Stack>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Ribbons;
