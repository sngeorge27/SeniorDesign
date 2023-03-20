import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
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

    function logMeIn(event) {
        axios({
            method: "POST",
            url: "/api/token",
            data: {
                email: loginForm.email,
                password: loginForm.password,
            },
        })
            .then((response) => {
                setToken(response.data.access_token);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
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
        <div className="h-[100dvh] w-full from-blue-500 to-blue-400 bg-gradient-to-b flex flex-col items-center">
            <div className="mt-[10dvh]">
                <h1 className="text-center text-white font-bold text-3xl p-4">
                    Welcome to Sabrosa Health
                </h1>
                <div className="min-h-[200px] min-w-[300px] rounded-md bg-slate-100 shadow-md flex flex-col p-4">
                    <h2 className="text-black font-bold text-lg self-center">
                        Login
                    </h2>
                    <form className="p-2 flex flex-col">
                        <div className="m-2 flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input
                                className="p-2"
                                onChange={handleChange}
                                type="email"
                                text={loginForm.email}
                                name="email"
                                placeholder="Email"
                                value={loginForm.email}
                            />
                        </div>
                        <div className="m-2 flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input
                                className="p-2"
                                onChange={handleChange}
                                type="password"
                                text={loginForm.password}
                                name="password"
                                placeholder="Password"
                                value={loginForm.password}
                            />
                        </div>

                        <button
                            className="bg-sky-500 rounded-md self-end p-2 m-2 text-white hover:bg-sky-600"
                            onClick={logMeIn}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
