import { Link } from "react-router-dom";

const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <div className="flex flex-col">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
            <br />
            <h2>Private</h2>
            <div className="flex flex-col">
                <Link to="/">Home</Link>
                <Link to="/editor">Editors Page</Link>
                <Link to="/admin">Admin Page</Link>
            </div>
        </section>
    );
};

export default LinkPage;
