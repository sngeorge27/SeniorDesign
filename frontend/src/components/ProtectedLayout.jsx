import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import HeadMetadata from "../components/HeadMetadata";
import Nav from "../components/Nav";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
// ...

export const ProtectedLayout = () => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return (
            <Navigate to="/login" return replace state={{ from: location }} />
        );
    }

    return (
        <div>
            <HeadMetadata title="Sabrosa Health" />
            <Header />
            <div className="main-container">
                <Nav />
                <div className="main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
