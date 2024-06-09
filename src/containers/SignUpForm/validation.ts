import * as yup from "yup";

export const yupSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    gender: yup.string().required("Gender is required"),
    location: yup
        .string()
        .required("Location is required")
        .min(5, "Location must be at least 5 characters long"),
    university: yup.string().required("University is required"),
    interests: yup.string().required("Interests is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});
