import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Base from "./pages/base";
import Goals from "./pages/goals";
import ErrorPage from "./pages/error";
import { HelmetProvider } from "react-helmet-async";
import Progress from "./pages/progress";
import Track from "./pages/track";
import Profile from "./pages/profile";
import Settings from "./pages/settings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Base />,
        errorElement: <ErrorPage />,
        children: [
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <RouterProvider router={router} />
        </HelmetProvider>
    </React.StrictMode>
);
