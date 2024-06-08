import { StackProps } from "@mui/material";
import { RecommendedUser } from "../../@types/commmon";

export type UserLayoutProps = StackProps & {
    data?: RecommendedUser;
    children?: React.ReactNode;
    enableBadge?: boolean;
};
