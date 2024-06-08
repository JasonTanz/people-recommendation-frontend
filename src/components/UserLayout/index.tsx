import { Avatar, Stack, Typography } from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import InterestsIcon from "@mui/icons-material/Interests";
import { avatarColor } from "../../utils/avatarColor";
import { UserLayoutProps } from "./props";
import MaleIcon from "@mui/icons-material/Male";

import FemaleIcon from "@mui/icons-material/Female";
import { ReactNode } from "react";
/**
 * ===========================
 * MAIN
 * ===========================
 */
export const UserLayout: React.FC<UserLayoutProps> = (props) => {
    const { data, children, enableBadge = false, ...restProps } = props;

    // =============== VARIABLES
    const username = data?.name;
    const background = avatarColor(username || "");
    const genderMap: Record<string, ReactNode> = {
        Male: (
            <MaleIcon
                sx={{
                    color: "#25a3d9",
                }}
            />
        ),
        Female: (
            <FemaleIcon
                sx={{
                    color: "#f04a95",
                }}
            />
        ),
    };

    // =============== RENDER FUNCTIONS
    const renderBadge = () => {
        if (data?.priority === 1) {
            return (
                <Stack
                    sx={{
                        position: "absolute",
                        right: "-97px",
                        top: "-74px",
                        width: "100%",
                        transform: "rotate(45deg)",
                        backgroundColor: "#ff4133",
                        color: "white",
                        padding: "12px",
                        textAlign: "center",
                    }}
                >
                    <Typography fontWeight={600}>Top Pick</Typography>
                </Stack>
            );
        }
        if (data?.priority === 2) {
            return (
                <Stack
                    sx={{
                        position: "absolute",
                        right: "-97px",
                        top: "-74px",
                        width: "100%",
                        transform: "rotate(45deg)",
                        backgroundColor: "#ff851b",
                        color: "white",
                        padding: "12px",
                        textAlign: "center",
                    }}
                >
                    <Typography fontWeight={600}>Recommended</Typography>
                </Stack>
            );
        }
        return (
            <Stack
                sx={{
                    position: "absolute",
                    right: "-97px",
                    top: "-74px",
                    width: "100%",
                    transform: "rotate(45deg)",
                    backgroundColor: "#ffdc00",
                    color: "black",
                    padding: "12px",
                    textAlign: "center",
                }}
            >
                <Typography fontWeight={600}>New</Typography>
            </Stack>
        );
    };

    // =============== VIEWS
    return (
        <Stack
            direction="column"
            borderRadius={"1.25rem"}
            padding="2rem"
            justifyContent={"flex-start"}
            gap={1}
            position={"relative"}
            {...restProps}
        >
            {enableBadge && <Stack>{renderBadge()}</Stack>}
            <Stack
                direction={"row"}
                gap={2}
                alignItems={"center"}
                paddingBottom={2}
            >
                <Avatar
                    sx={{
                        width: 56,
                        height: 56,
                        background,
                    }}
                >
                    {username?.charAt(0).toUpperCase()}
                </Avatar>
                <Stack>
                    <Typography>{username}</Typography>
                    <Stack direction="row">
                        <Typography>{data?.gender}</Typography>
                        {genderMap[data?.gender || ""]}
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction="row" gap={1}>
                <LocationOnIcon
                    sx={{
                        color: "red",
                    }}
                />
                <Typography>{data?.location}</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
                <SchoolIcon />
                <Typography>{data?.university}</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
                <InterestsIcon sx={{ color: "orange" }} />
                <Typography>{data?.interests}</Typography>
            </Stack>
            {children}
        </Stack>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default UserLayout;
