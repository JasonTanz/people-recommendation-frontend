import { Avatar, Stack, Typography } from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import InterestsIcon from "@mui/icons-material/Interests";
import { avatarColor } from "../../utils/avatarColor";
import { UserLayoutProps } from "./props";
import MaleIcon from "@mui/icons-material/Male";

import FemaleIcon from "@mui/icons-material/Female";
import { Fragment, ReactNode } from "react";
import Ribbons from "../Ribbons";
import store from "../../store";
/**
 * ===========================
 * MAIN
 * ===========================
 */
export const UserLayout: React.FC<UserLayoutProps> = (props) => {
    const { data, children, enableBadge = false, ...restProps } = props;

    // =============== VARIABLES
    const username = data?.name;
    const authState = store.getState().auth;
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
        const owner = authState.user;
        const sameUniversity = data?.university === owner?.university;
        const sameInterests = data?.interests === owner?.interests;
        if (sameUniversity && sameInterests) {
            return <Ribbons label={"Top Pick"} />;
        }
        if (sameUniversity || sameInterests) {
            return <Ribbons label={"Recommended"} backgroundColor="#ff851b" />;
        }
        return (
            <Ribbons backgroundColor="#ffdc00" color="black" label={"New"} />
        );
    };

    const renderInfo = () => {
        return (
            <Fragment>
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
            </Fragment>
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
            {renderInfo()}
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
