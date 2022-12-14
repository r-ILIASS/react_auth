import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

const LOGIN_URL = "/auth";

const Login = () => {
    const { setAuthState } = useAuth();
    const emailRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("admin@email.com"); // TODO:
    const [password, setPassword] = useState("admin"); // TODO:

    const [errMsg, setErrMsg] = useState("");

    // focus email on mount
    useEffect(() => {
        // emailRef.current.focus();
    }, []);

    // clear errMsg on user interaction
    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // submit to backend
        try {
            const response = await axios.post(
                LOGIN_URL,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            // save response to AuthContext's state
            setAuthState({ email, roles, accessToken });

            setEmail("");
            setPassword("");
            navigate(from, {
                replace: true,
            });
        } catch (error) {
            if (error.message === "Network Error") {
                setErrMsg("Something went wrong, please try again later!");
            } else if (error.response.status === 400) {
                setErrMsg("Missing email or password");
            } else if (error.response.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login failed!");
            }
        }
        // setTimeout(() => {
        //     errRef.current.focus();
        // }, 1000); // FIXME: find a better solution to this
    };

    return (
        <section className="relative">
            {/* -- Error Message */}
            {errMsg && (
                <p
                    className="form-container-error"
                    ref={errRef}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
            )}

            {/* -- Form Title */}
            <div className="form-container-heading">
                <h1>Login</h1>
            </div>

            {/* -- Form */}
            <form onSubmit={handleSubmit}>
                {/* email */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>

                {/* password */}
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>

                {/* space */}
                <div />

                {/* submit */}
                <button>Login</button>

                <span>
                    Don't have an account?
                    <Link to="/register">Register</Link>
                </span>
            </form>
        </section>
    );
};

export default Login;
