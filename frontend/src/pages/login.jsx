import { useAuth } from "../hooks/useAuth";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
    const { token, setToken } = useAuth();
    const location = useLocation();

    if (token) {
        return <Navigate to="/" return replace state={{ from: location }} />;
    }

    const [loginForm, setloginForm] = useState({
        email: "",
        password: "",
    });

    const [loginError, setLoginError] = useState(false);

    function login(event) {
        axios({
            method: "POST",
            url: "/api/token",
            data: {
                email: loginForm.email,
                password: loginForm.password,
            },
        })
            .then((response) => {
                setLoginError(false);
                setToken(response.data.access_token);
            })
            .catch((error) => {
                if (error) {
                    setLoginError(true);
                    console.log(error);
                }
            });

        setloginForm({
            email: "",
            password: "",
        });

        event.preventDefault();
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setloginForm((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    }

    return (
        <div className="h-[100dvh] w-full from-cyan-800 to-cyan-700 bg-gradient-to-b flex flex-col items-center">
            <div className="mt-[10dvh] w-full mx-auto flex flex-col items-center">
                <h1 className="text-center text-white font-bold text-4xl p-4 leading-loose">
                    Welcome to Sabrosa Health
                </h1>
                <div className="min-h-[200px] min-w-[400px] rounded-md bg-gray-100 shadow-md flex flex-col p-4">
                    <h2 className="text-black font-semibold text-2xl self-center">
                        Login
                    </h2>
                    <form className="p-2 flex flex-col">
                        <div className="m-2 flex flex-col">
                            <label className="leading-8" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="p-2 bg-gray-200 rounded-md shadow"
                                onChange={handleChange}
                                type="email"
                                text={loginForm.email}
                                name="email"
                                value={loginForm.email}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-col">
                            <label className="leading-8" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="p-2 bg-gray-200 rounded-md shadow"
                                onChange={handleChange}
                                type="password"
                                text={loginForm.password}
                                name="password"
                                value={loginForm.password}
                                required
                            />
                        </div>
                        {loginError && (
                            <p className="p-2 text-red-700">
                                Incorrect email or password. Try Again
                            </p>
                        )}
                        <div className="flex p-2 justify-between items-center">
                            <div className="flex">
                                <p>Need an account?&nbsp;</p>
                                <Link
                                    to={"/signup"}
                                    className="underline text-cyan-900"
                                >
                                    Register
                                </Link>
                            </div>
                            <button
                                className="bg-cyan-500 font-semibold rounded-md self-end p-2 m-2 text-white hover:bg-cyan-600"
                                onClick={login}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
