import { Outlet } from "react-router-dom";
import HeadMetadata from "../components/HeadMetadata";
import Nav from "../components/Nav";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return (
            <Navigate to="/login" return replace state={{ from: location }} />
        );
    }

    return (
        <div>
            <HeadMetadata title="Sabrosa Health" />
            <div className="flex h-screen max-h-screen w-full bg-gray-200">
                <Nav />
                <Outlet />
            </div>
        </div>
    );
};
