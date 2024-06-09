import * as yup from "yup";

export const yupSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is a required field")
        .min(3, "Name must be at least 3 character long"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
});
