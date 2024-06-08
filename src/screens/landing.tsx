import { Container, Stack } from "@mui/material";
import LoginForm from "../containers/LoginForm";
import { useState } from "react";
import SignUpForm from "../containers/SignUpForm";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const LandingScreen: React.FC = () => {
    // =============== HOOKS

    // =============== STATE
    const [screen, setScreen] = useState<"login" | "signup">("login");

    // =============== API

    // =============== EVENTS
    const onHandleChangeScreen = (target: string) => {
        setScreen(target as "login" | "signup");
    };

    // =============== VARIABLES
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
