import { Link } from "react-router-dom";
import Employees from "./Employees";

const Admin = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <Employees />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    );
};

export default Admin;
