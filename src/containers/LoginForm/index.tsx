import { Controller, useForm } from "react-hook-form";
import TextField from "../../components/TextField";
import { FormValues, LoginFormProps } from "./props";
import { Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { Fragment } from "react/jsx-runtime";
import { usePostData } from "../../hooks/fetchDataHooks";
import { Button } from "../../components/Button";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../reducers/authSlice";
import { useNavigate } from "react-router-dom";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const LoginForm: React.FC<LoginFormProps> = (props) => {
    const { onSignUpClick } = props;

    // =============== HOOKS
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<FormValues>({
        mode: "all",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            password: "",
        },
    });

    // =============== API
    const { fetch, loading } = usePostData({
        url: "/auth/login",
        onCompleted: (res) => {
            const data = res.data;
            const loginObj = {
                accessToken: data.accessToken,
                user: data.data,
            };
            dispatch(LOGIN(loginObj));
            toast.success("Login successful");
            return navigate("/user", { replace: true });
        },
        onError: (err) => {
            toast.error(err);
        },
    });

    // =============== EVENTS
    const onHandleSubmit = async (data: FormValues) => {
        return fetch({
            ...data,
        });
    };

    // =============== RENDER FUNCTIONS
    const renderFields = () => {
        return (
            <Fragment>
                <Controller
                    name="name"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <TextField
                            label="Name"
                            onChange={onChange}
                            value={value}
                            error={error}
                            onBlur={onBlur}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <TextField
                            label="Password"
                            onChange={onChange}
                            value={value}
                            error={error}
                            onBlur={onBlur}
                            type="password"
                        />
                    )}
                />
            </Fragment>
        );
    };

    // =============== VIEWS
    return (
        <form onSubmit={handleSubmit(onHandleSubmit)}>
            <Stack gap={3}>
                <Stack textAlign={"center"}>
                    <Typography variant="h4" fontWeight={800}>
                        Login
                    </Typography>
                    <Typography variant="body2">
                        Enter your credentials to continue
                    </Typography>
                </Stack>
                {renderFields()}
                <Button type="submit" loading={loading}>
                    Login
                </Button>
                <Typography color="#000" variant="body2">
                    Don't have an account?{" "}
                    <span
                        style={{ color: "#54ccff", cursor: "pointer" }}
                        onClick={onSignUpClick}
                    >
                        Sign up
                    </span>
                </Typography>
            </Stack>
        </form>
    );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default LoginForm;
