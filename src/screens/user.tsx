import {
    CircularProgress,
    Container,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import { useFetchData } from "../hooks/fetchDataHooks";
import { Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import store from "../store";
import Swiper from "../components/Swiper";

import LogoutIcon from "@mui/icons-material/Logout";
import { LOGOUT } from "../reducers/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserLayout from "../components/UserLayout";
import { RecommendedUser } from "../@types/commmon";
import { isEmpty } from "lodash";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const UserScreen: React.FC = () => {
    // =============== HOOKS
    const authState = store.getState().auth;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // =============== VARIABLES
    const token = authState.accessToken;
    const user = authState.user;

    // =============== API
    const { fetch, data, loading } = useFetchData({
        url: "/user/recommendation",
        axiosParams: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        onCompleted: (res) => {
            const data = res.data;
            const isNewResult = data.newResult;
            if (isEmpty(data.data)) {
                return toast("You've reached the end of the recommendation");
            }
            if (isNewResult) {
                return toast.success("New recommendations are available!");
            }
            return toast.error(
                "Daily recommendation limit exceeded. Please come back again tomorrow"
            );
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    // =============== EFFECTS
    useEffect(() => {
        fetch();
    }, []);

    // =============== EVENTS
    const onHandleLogout = () => {
        dispatch(LOGOUT());
        toast.success("Logout successful");
        return navigate("/", { replace: true });
    };

    // =============== VARIABLES
    // const recommendation = data?.data?.sort(
    //     (a: RecommendedUser, b: RecommendedUser) => a.priority - b.priority
    // );
    const recommendation = data?.data;

    // =============== RENDER FUNCTIONS
    const renderSlides = () => {
        if (!loading) return <Swiper slides={recommendation} />;
        return (
            <Stack justifyContent={"center"} alignItems="center" height="100%">
                <CircularProgress />
            </Stack>
        );
    };

    const renderProfile = () => {
        return (
            <Fragment>
                <Typography variant="h5" fontWeight={"bold"}>
                    Your Profile
                </Typography>
                <UserLayout
                    data={user as RecommendedUser}
                    boxShadow={
                        "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                    }
                    borderRadius={"1.25rem"}
                    padding="2rem"
                    justifyContent={"flex-start"}
                    gap={1}
                >
                    <Divider sx={{ my: 2 }} />
                    <Stack
                        direction="row"
                        gap={1}
                        sx={{ cursor: "pointer" }}
                        onClick={onHandleLogout}
                    >
                        <LogoutIcon />
                        <Typography>Log out</Typography>
                    </Stack>
                </UserLayout>
            </Fragment>
        );
    };

    // =============== VIEWS
    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Stack
                display={"flex"}
                flexDirection={{
                    xs: "column",
                    lg: "row",
                }}
                justifyContent={"space-between"}
                rowGap={{
                    xs: 6,
                    md: 0,
                }}
                width="100%"
                marginBottom={{
                    xs: 5,
                    lg: 0,
                }}
            >
                <Stack direction="column" gap={3}>
                    <Typography variant="h5" fontWeight={"bold"}>
                        Top picks of the day
                    </Typography>
                    {renderSlides()}
                </Stack>
                <Stack
                    direction={"column"}
                    gap={3}
                    paddingTop={{
                        sm: 5,
                        lg: 0,
                    }}
                    width={{
                        sm: "50%",
                        lg: "35%",
                    }}
                >
                    {renderProfile()}
                </Stack>
            </Stack>
        </Container>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default UserScreen;
