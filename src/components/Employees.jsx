import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Employees = () => {
    const [employees, setEmployees] = useState();
    const refresh = useRefreshToken();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getEmployees = async () => {
            try {
                const res = await axiosPrivate.get("/employees", {
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
