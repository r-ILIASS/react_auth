import { useState, useEffect } from "react";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";

const Employees = () => {
    const [employees, setEmployees] = useState();
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getEmployees = async () => {
            try {
                const res = await axios.get("/employees", {
                    signal: controller.signal,
                });
                console.log("employees", res.data); // TODO:

                isMounted && setEmployees(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        getEmployees();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <article>
            <h2>Employees List</h2>

            {employees?.length ? (
                <ul>
                    {employees.map((employee, i) => (
                        <li key={String(i)}>{employee.fullname}</li>
                    ))}
                </ul>
            ) : (
                <p>No employees to display</p>
            )}

            <button className="p-1 bg-white text-black rounded-md" onClick={() => refresh()}>Refresh</button>
        </article>
    );
};

export default Employees;
