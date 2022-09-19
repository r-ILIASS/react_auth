import { useEffect } from "react";
import axiosPrivate from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { authState } = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `
                    Bearer ${authState?.accessToken}
                    `;
                }
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const accessToken = await refresh();
                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${accessToken}`;
                    return axiosPrivate(prevRequest);
                }
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        };
    }, [authState, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
