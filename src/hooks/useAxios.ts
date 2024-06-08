import { useState } from "react";
import { API_URL } from "../constants/index";
import PropTypes from "prop-types";
import axios from "axios";

axios.defaults.baseURL = API_URL;
const useAxios = (axiosParams: object, onCompleted: any, onError: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const fetchData = (data?: object | null) => {
        setLoading(true);
        axios
            .request({
                ...axiosParams,
                data: data ? data : null,
            })
            .then((res: any) => {
                if (
                    res.status === 200 ||
                    res.status === 201 ||
                    res.status === 203
                ) {
                    onCompleted(res);
                } else {
                    onError?.(res);
                }
            })

            .catch((err: any) => {
                const message = err.response.data;
                onError?.(message, err);
            })

            .finally(() => {
                setLoading(false);
            });
    };

    return { loading, fetch: fetchData };
};

useAxios.propTypes = {
    axiosParams: PropTypes.object.isRequired,
    onUpdate: PropTypes.func,
};

export default useAxios;
