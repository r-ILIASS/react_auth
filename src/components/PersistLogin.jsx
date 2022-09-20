import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { authState } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        !authState?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    // TODO:
    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`authToken: ${JSON.stringify(authState?.accessToken)}`);
    }, [isLoading]);

    return <>{isLoading ? <p>Loading</p> : <Outlet />}</>;
};

export default PersistLogin;
