import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    function getUser() {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        return user && user;
    }

    function saveUser(user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem(user.username, JSON.stringify(user));
        setUser(user);
    }

    function removeToken() {
        localStorage.removeItem("currentUser");
        setUser(null);
    }

    const [user, setUser] = useState(getUser());
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        removeToken();
        navigate("/login", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            onLogout: handleLogout,
            setUser: saveUser,
        }),
        [user]
    );
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
