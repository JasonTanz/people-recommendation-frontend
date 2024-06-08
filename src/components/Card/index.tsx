import { Stack, Typography } from "@mui/material";
import { CardProps } from "./props";
import UserLayout from "../UserLayout";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Card: React.FC<CardProps> = (props) => {
    const { data, isEmpty = false } = props;

    // =============== VIEWS
    if (!isEmpty) {
        return <UserLayout enableBadge data={data} width={"100%"}></UserLayout>;
    }

    return (
        <Stack
            direction="column"
            width={"100%"}
            height="100%"
            padding="2rem"
            justifyContent={"center"}
        >
            <Typography>
                You've reached the end of the recommendation
            </Typography>
            <Typography>Please come back tomorrow</Typography>
        </Stack>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default Card;
