import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import Dashboards from "../features/chat/pages/Dashboards.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import { Navigate } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected><Dashboards /></Protected>
    },
    {
        path:"/dashboards",
        element:<Navigate to="/"  replace/>
    }
])

