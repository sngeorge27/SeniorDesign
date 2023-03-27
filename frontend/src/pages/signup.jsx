import { useAuth } from "../hooks/useAuth";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { apiBaseURL } from "../constants";

const SignUp = () => {
    const { token, setToken } = useAuth();
    const location = useLocation();

    if (token) {
        return <Navigate to="/" return replace state={{ from: location }} />;
    }

    const [passwordMismatchError, setPasswordMismatchError] = useState(false);

    const [signupForm, setSignupForm] = useState({
        firstName: "",
        lastName: "",
        age: "",
        sex: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function signup(event) {
        if (signupForm.password !== signupForm.confirmPassword) {
            setPasswordMismatchError(true);
            return;
        }

        axios({
            method: "POST",
            url: apiBaseURL + "/api/signup",
            data: {
                firstName: signupForm.firstName,
                lastName: signupForm.lastName,
                age: signupForm.age,
                sex: signupForm.sex,
                email: signupForm.email,
                password: signupForm.password,
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

        setSignupForm({
            firstName: "",
            lastName: "",
            age: "",
            sex: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        event.preventDefault();
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setSignupForm((prevNote) => ({
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
                        Sign Up
                    </h2>
                    <form className="p-2 flex flex-col">
                        <div className="flex">
                            <div className="m-2 flex flex-col">
                                <label
                                    className="leading-8"
                                    htmlFor="firstName"
                                >
                                    First Name
                                </label>
                                <input
                                    className="p-2 bg-gray-200 rounded-md shadow"
                                    onChange={handleChange}
                                    type="text"
                                    text={signupForm.firstName}
                                    name="firstName"
                                    value={signupForm.firstName}
                                    required
                                />
                            </div>
                            <div className="m-2 flex flex-col">
                                <label className="leading-8" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    className="p-2 bg-gray-200 rounded-md shadow"
                                    onChange={handleChange}
                                    type="text"
                                    text={signupForm.lastName}
                                    name="lastName"
                                    value={signupForm.lastName}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="m-2 flex flex-col">
                                <label
                                    className="leading-8"
                                    htmlFor="firstName"
                                >
                                    Age
                                </label>
                                <input
                                    className="p-2 bg-gray-200 rounded-md shadow"
                                    onChange={handleChange}
                                    type="number"
                                    text={signupForm.age}
                                    name="age"
                                    value={signupForm.age}
                                    required
                                />
                            </div>
                            <div className="m-2 flex flex-col w-full">
                                <label className="leading-8" htmlFor="lastName">
                                    Sex
                                </label>
                                <select
                                    className="p-2 bg-gray-200 rounded-md shadow w-full"
                                    onChange={handleChange}
                                    text={signupForm.sex}
                                    name="sex"
                                    value={signupForm.sex}
                                    required
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="m-2 flex flex-col">
                            <label className="leading-8" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="p-2 bg-gray-200 rounded-md shadow"
                                onChange={handleChange}
                                type="email"
                                text={signupForm.email}
                                name="email"
                                value={signupForm.email}
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
                                text={signupForm.password}
                                name="password"
                                value={signupForm.password}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-col">
                            <label
                                className="leading-8"
                                htmlFor="confirmPassword"
                            >
                                Confirm Password
                            </label>
                            <input
                                className="p-2 bg-gray-200 rounded-md shadow"
                                onChange={handleChange}
                                type="password"
                                text={signupForm.confirmPassword}
                                name="confirmPassword"
                                value={signupForm.confirmPassword}
                                required
                            />
                        </div>
                        {passwordMismatchError && (
                            <p className="p-2 text-red-700">
                                Passwords must match
                            </p>
                        )}
                        <div className="flex p-2 justify-between items-center">
                            <div className="flex">
                                <p>Already have an account?&nbsp;</p>
                                <Link
                                    to={"/login"}
                                    className="underline text-cyan-900"
                                >
                                    Login
                                </Link>
                            </div>
                            <button
                                className="bg-cyan-500 font-semibold rounded-md self-end p-2 m-2 text-white hover:bg-cyan-600"
                                onClick={signup}
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

export default SignUp;
