import React from "react";
import ReactDOM from "react-dom/client";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    defer,
    RouterProvider,
} from "react-router-dom";
import "./styles/index.css";
import { AuthLayout } from "./components/AuthLayout";
import Goals from "./pages/goals";
import ErrorPage from "./pages/error";
import { HelmetProvider } from "react-helmet-async";
import Progress from "./pages/progress";
import Track from "./pages/track";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import { ProtectedLayout } from "./components/ProtectedLayout";
import SignUp from "./pages/signup";

const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <ProtectedLayout />,
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <Dashboard /> },
                    {
                        path: "/goals",
                        element: <Goals />,
                    },
                    {
                        path: "/progress",
                        element: <Progress />,
                    },
                    {
                        path: "/track",
                        element: <Track />,
                    },
                    {
                        path: "/profile",
                        element: <Profile />,
                    },
                    {
                        path: "/settings",
                        element: <Settings />,
                    },
                ],
            },
            {
                path: "/login",
                element: <Login />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/signup",
                element: <SignUp />,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <RouterProvider router={router} />
        </HelmetProvider>
    </React.StrictMode>
);
