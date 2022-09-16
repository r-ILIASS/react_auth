import { useRef, useState, useEffect } from "react";

const Login = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("email@email.com"); // TODO:
    const [password, setPassword] = useState("G4moto@ma"); // TODO:

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    // focus email on mount
    useEffect(() => {
        // emailRef.current.focus();
    }, []);

    // clear errMsg on user interaction
    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    // submit
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("submitted");
    };

    return (
        <section>
            {/* success message */}
            {success && (
                <div className="form-container-success">You are logged in!</div>
            )}

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
                    <a href="#">Register</a>
                </span>
            </form>
        </section>
    );
};

export default Login;
