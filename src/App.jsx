import { Routes, Route } from "react-router-dom";

import Admin from "./components/Admin";
import Editor from "./components/Editor";
import Home from "./components/Home";
import Layout from "./components/Layout";
import LinkPage from "./components/LinkPage";
import Login from "./components/Login";
import Lounge from "./components/Lounge";
import Missing from "./components/Missing";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";

// this is not safe, for demo only, use user codes directly instead
const ROLES = {
    Admin: 5555,
    Editor: 1924,
    User: 2413,
};

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="linkpage" element={<LinkPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* protected routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                    <Route path="/" element={<Home />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
                    <Route path="editor" element={<Editor />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                    <Route path="admin" element={<Admin />} />
                </Route>

                {/* prettier-ignore */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
                    <Route path="lounge" element={<Lounge />} />
                </Route>

                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
};

export default App;
