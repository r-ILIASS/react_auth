import { useState, useEffect, useRef } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Employees = () => {
    const effectRun = useRef(false);

    const [employees, setEmployees] = useState();
    const refresh = useRefreshToken();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => console.log(employees), [employees]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        // fetch employees
        const getEmployees = async () => {
            try {
                const { data } = await axiosPrivate.get("/employees", {
                    signal: controller.signal,
                });

                isMounted && setEmployees(data);
            } catch (error) {
                console.error("Axios error > Employees page", error);
                if (error?.response?.status === 403) {
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                }
            }
        };

        // check if useEffect has run before
        if (effectRun.current) {
            getEmployees();
        }

        // avoid flashes of content before redirecting to login page
        return () => {
            isMounted = false;
            controller.abort();
            effectRun.current = true;
        };
    }, []);

    return (
        <article>
            <div>
                <p>Logged in as Admin</p>
                <ul>
                    {employees &&
                        employees.map((employee) => (
                            <li key={employee._id}>{employee.email}</li>
                        ))}
                </ul>
            </div>
        </article>
    );
};

export default Employees;
