import { Container, Stack } from "@mui/material";
import LoginForm from "../containers/LoginForm";
import { useState } from "react";
import SignUpForm from "../containers/SignUpForm";
import store from "../store";
import { Navigate } from "react-router-dom";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const LandingScreen: React.FC = () => {
    // =============== STATE
    const [screen, setScreen] = useState<"login" | "signup">("login");

    // =============== EVENTS
    const onHandleChangeScreen = (target: string) => {
        setScreen(target as "login" | "signup");
    };

    // =============== VARIABLES
    const authState = store.getState().auth;
    const formScreen = {
        login: (
            <LoginForm onSignUpClick={() => onHandleChangeScreen("signup")} />
        ),
        signup: (
            <SignUpForm onLoginClick={() => onHandleChangeScreen("login")} />
        ),
    };

    // =============== RENDER FUNCTIONS
    const renderScreen = () => formScreen[screen];

    // =============== VIEWS
    if (authState.isAuthenticated) {
        return <Navigate to="/user" />;
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                marginBlock: screen === "login" ? "0" : "7rem",
            }}
        >
            <Stack
                boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
                borderRadius={"1.25rem"}
                padding={"2rem"}
                width={"100%"}
            >
                {renderScreen()}
            </Stack>
        </Container>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default LandingScreen;
