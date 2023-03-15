import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    function getToken() {
        const userToken = localStorage.getItem("token");
        return userToken && userToken;
    }

    function saveToken(userToken) {
        localStorage.setItem("token", userToken);
        setToken(userToken);
    }

    function removeToken() {
        localStorage.removeItem("token");
        setToken(null);
    }

    const [token, setToken] = useState(getToken());
    const navigate = useNavigate();
    const location = useLocation();

    // call this function when you want to authenticate the user
    const handleLogin = async (event, loginForm) => {
        const token = await fakeAuth();

        const origin = location.state?.from?.pathname || "/";
        navigate(origin);

        console.log(token);
    };

    // call this function to sign out logged in user
    const handleLogout = () => {
        removeToken();
        navigate("/login", { replace: true });

        console.log(token);
    };

    const value = useMemo(
        () => ({
            token,
            onLogin: handleLogin,
            onLogout: handleLogout,
            setToken: saveToken,
        }),
        [token]
    );
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

const fakeAuth = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve("2342f2f1d131rf12"), 250);
    });
