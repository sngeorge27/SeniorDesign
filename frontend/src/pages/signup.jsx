import { useAuth } from "../hooks/useAuth";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import CheckBox from "../components/CheckBox";

const SignUp = () => {
    const { user, setUser } = useAuth();
    const [signupForm, setSignupForm] = useState({
        firstName: "",
        lastName: "",
        age: "",
        sex: "",
        isPregnant: false,
        isLactating: false,
        macroRatio: "maintain",
        height: "",
        weight: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);

    function signup(event) {
        const existingUser = JSON.parse(
            localStorage.getItem(signupForm.username)
        );
        console.log("existing user", existingUser);

        if (signupForm.password !== signupForm.confirmPassword) {
            setErrorMessage("Passwords must match");
        } else if (existingUser) {
            setErrorMessage("A user with that username already exists");
        } else {
            localStorage.setItem(
                "currentUser",
                JSON.stringify(`${signupForm.username}`)
            );

            const newUser = {
                firstName: signupForm.firstName,
                lastName: signupForm.lastName,
                age: parseInt(signupForm.age),
                sex: signupForm.sex,
                isPregnant: signupForm.isPregnant,
                isLactating: signupForm.isLactating,
                macroRatio: signupForm.macroRatio,
                height: parseFloat(signupForm.height),
                weight: parseFloat(signupForm.weight),
                username: signupForm.username,
                password: signupForm.password,
                loggedFood: [],
            };
            localStorage.setItem(
                `${signupForm.username}`,
                JSON.stringify(newUser)
            );
            setUser(newUser);

            setSignupForm({
                firstName: "",
                lastName: "",
                age: "",
                sex: "",
                isPregnant: false,
                isLactating: false,
                macroRatio: "maintain",
                height: "",
                weight: "",
                username: "",
                password: "",
                confirmPassword: "",
            });

            console.log(localStorage.getItem(`${signupForm.username}`));
        }

        event.preventDefault();
    }

    function handleChange(event) {
        const { value, name } = event.target;

        if ((name === "sex" && value == "M") || value == "") {
            setSignupForm((prevInfo) => ({
                ...prevInfo,
                [name]: value,
                isLactating: false,
                isPregnant: false,
            }));
        } else {
            setSignupForm((prevInfo) => ({
                ...prevInfo,
                [name]: value,
            }));
        }
    }

    if (user) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className="h-[100dvh] w-full from-cyan-800 to-cyan-700 bg-gradient-to-b flex flex-col items-center">
            <div className="mt-[5dvh] w-full mx-auto flex flex-col items-center">
                <h1 className="text-center text-white font-bold text-4xl p-4 leading-loose">
                    Welcome to Sabrosa Health
                </h1>
                <div className="min-h-[200px] min-w-[400px] rounded-md bg-gray-100 shadow-md flex flex-col p-4">
                    <h2 className="text-black font-semibold text-2xl self-center">
                        Sign Up
                    </h2>
                    <form className="p-2 flex flex-col">
                        <div className="flex">
                            <div className="m-2 flex flex-col w-full">
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
                            <div className="m-2 flex flex-col w-full">
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
                            <div className="m-2 flex flex-col w-full">
                                <label
                                    className="leading-8"
                                    htmlFor="macroRatio"
                                >
                                    Macro Goal
                                </label>
                                <select
                                    className="p-2 bg-gray-200 rounded-md shadow"
                                    onChange={handleChange}
                                    text={signupForm.macroRatio}
                                    name="macroRatio"
                                    value={signupForm.macroRatio}
                                    required
                                >
                                    <option value="maintain">
                                        Maintenance
                                    </option>
                                    <option value="loss">Weight loss</option>
                                    <option value="gain">Muscle gain</option>
                                    <option value="keto">Keto</option>
                                </select>
                            </div>
                            <div className="m-2 flex flex-col w-full">
                                <label className="leading-8" htmlFor="sex">
                                    Sex
                                </label>
                                <select
                                    className="p-2 bg-gray-200 rounded-md shadow"
                                    onChange={handleChange}
                                    text={signupForm.sex}
                                    name="sex"
                                    value={signupForm.sex}
                                    required
                                >
                                    <option value=""></option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                            </div>
                        </div>
                        {signupForm.sex == "F" && (
                            <div className="flex w-full">
                                <div className="p-2 flex w-1/2 items-center">
                                    {/* <input
                                        onChange={handleChange}
                                        type="checkbox"
                                        name="isPregnant"
                                        value={signupForm.isPregnant}
                                        required
                                    /> */}
                                    <CheckBox
                                        checked={signupForm.isPregnant}
                                        setChecked={() =>
                                            setSignupForm({
                                                ...signupForm,
                                                isPregnant:
                                                    !signupForm.isPregnant,
                                            })
                                        }
                                    />
                                    <label
                                        className="leading-8 ml-2"
                                        htmlFor="isPregnant"
                                    >
                                        Pregnant?
                                    </label>
                                </div>
                                <div className="p-2 flex w-1/2 items-center">
                                    {/* <input
                                        onChange={handleChange}
                                        type="checkbox"
                                        name="isLactating"
                                        value={signupForm.isLactating}
                                        required
                                    /> */}
                                    <CheckBox
                                        checked={signupForm.isLactating}
                                        setChecked={() =>
                                            setSignupForm({
                                                ...signupForm,
                                                isLactating:
                                                    !signupForm.isLactating,
                                            })
                                        }
                                    />
                                    <label
                                        className="leading-8 ml-2"
                                        htmlFor="isLactating"
                                    >
                                        Lactating?
                                    </label>
                                </div>
                            </div>
                        )}
                        <div className="flex">
                            <div className="m-2 flex flex-col">
                                <label className="leading-8" htmlFor="age">
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
                                <label className="leading-8" htmlFor="height">
                                    Height (in)
                                </label>
                                <input
                                    className="p-2 bg-gray-200 rounded-md shadow"
                                    onChange={handleChange}
                                    type="number"
                                    text={signupForm.height}
                                    name="height"
                                    value={signupForm.height}
                                    required
                                />
                            </div>
                            <div className="m-2 flex flex-col w-full">
                                <label className="leading-8" htmlFor="weight">
                                    Weight (lbs)
                                </label>
                                <input
                                    className="p-2 bg-gray-200 rounded-md shadow"
                                    onChange={handleChange}
                                    type="number"
                                    text={signupForm.weight}
                                    name="weight"
                                    value={signupForm.weight}
                                    required
                                />
                            </div>
                        </div>
                        <div className="m-2 flex flex-col">
                            <label className="leading-8" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="p-2 bg-gray-200 rounded-md shadow"
                                onChange={handleChange}
                                type="text"
                                text={signupForm.username}
                                name="username"
                                value={signupForm.username}
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
                        {errorMessage && (
                            <p className="p-2 text-red-700">{errorMessage}</p>
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
