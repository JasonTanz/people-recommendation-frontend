import { ReactNode, useEffect } from "react";
import { API_URL } from "../constants";
import axios from "axios";
import store from "../store";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../reducers/authSlice";
import { Navigate } from "react-router-dom";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any;
    children?: ReactNode;
    isProtected?: boolean;
    footer?: boolean;
    clearForm?: boolean;
    protectLevel?: number;
}

export const VPRoutes = ({
    isProtected = false,
    component: Component,
    ...rest
}: Props) => {
    const authState = store.getState().auth;
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(LOGOUT());
    };
    useEffect(() => {
        axios
            .get(`${API_URL}/auth`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                },
            })
            .then((res) => {
                if (
                    res.status === 200 ||
                    res.status === 203 ||
                    res.status === 204
                ) {
                    return;
                } else {
                    logout();
                }
            });
    });

    if (isProtected && !authState.isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Component {...rest} />;
};

export default VPRoutes;
