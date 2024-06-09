import { Controller, useForm } from "react-hook-form";
import { FormValues, SignUpFormProps } from "./props";
import { Stack, Typography } from "@mui/material";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { Fragment } from "react/jsx-runtime";
import Select from "../../components/Select";
import {
    genderOptions,
    interestsOptions,
    universityOptions,
} from "../../constants/options";
import { usePostData } from "../../hooks/fetchDataHooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../reducers/authSlice";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { yupSchema } from "./validation";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const SignUpForm: React.FC<SignUpFormProps> = (props) => {
    const { onLoginClick } = props;

    const { control, handleSubmit } = useForm<FormValues>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver(yupSchema),
        defaultValues: {
            name: "",
            password: "",
            confirmPassword: "",
            university: "",
            location: "",
            interests: "",
            gender: "",
        },
    });
    // =============== HOOKS
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // =============== STATE

    // =============== API
    const { fetch, loading } = usePostData({
        url: "/auth/signup",
        onCompleted: (res) => {
            const data = res.data;
            const loginObj = {
                accessToken: data.accessToken,
                user: data.data,
            };
            dispatch(LOGIN(loginObj));
            toast.success("Sign up successful");
            return navigate("/user", { replace: true });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    // =============== EVENTS
    const onHandleSubmit = async (data: FormValues) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...restData } = data;
        return fetch({
            ...restData,
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
                    name="gender"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <Select
                            label="Gender"
                            onChange={onChange}
                            value={value}
                            onBlur={onBlur}
                            error={error}
                            options={genderOptions}
                        />
                    )}
                />
                <Controller
                    name="location"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <TextField
                            label="Location"
                            onChange={onChange}
                            value={value}
                            error={error}
                            onBlur={onBlur}
                        />
                    )}
                />
                <Controller
                    name="university"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <Select
                            label="University"
                            onChange={onChange}
                            value={value}
                            onBlur={onBlur}
                            error={error}
                            options={universityOptions}
                        />
                    )}
                />
                <Controller
                    name="interests"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <Select
                            label="Interests"
                            onChange={onChange}
                            value={value}
                            onBlur={onBlur}
                            error={error}
                            options={interestsOptions}
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
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => (
                        <TextField
                            label="Confirm Password"
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
                        Sign Up
                    </Typography>
                    <Typography variant="body2">
                        Enter your details to continue
                    </Typography>
                </Stack>
                {renderFields()}
                <Button type="submit" loading={loading}>
                    Sign Up
                </Button>
                <Typography color="#000" variant="body2">
                    Already have an account?{" "}
                    <span
                        style={{ color: "#54ccff", cursor: "pointer" }}
                        onClick={onLoginClick}
                    >
                        Login
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
export default SignUpForm;
