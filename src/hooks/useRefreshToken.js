import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuthState } = useAuth();

    const refresh = async () => {
        const res = await axios.get("/refresh", {
            withCredentials: true,
        });

        setAuthState((prev) => {
            console.log(JSON.stringify(prev));
            console.log(res.data); // TODO:
            return { ...prev, accessToken: res.data.accessToken };
        });

        return res.data.accessToken;
    };

    return refresh;
};

export default useRefreshToken;
