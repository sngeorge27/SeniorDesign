import { useAuth } from "../hooks/useAuth";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const { user, setUser } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "Bob",
            lastName: "Johnson",
            age: "25",
            sex: "M",
            isPregnant: false,
            isLactating: false,
            macroRatio: "maintain",
            height: "74",
            weight: "180",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    function signup(signupForm) {
        const existingUser = JSON.parse(
            localStorage.getItem(signupForm.username)
        );

        if (signupForm.password !== signupForm.confirmPassword) {
            setError("confirmPassword", {
                type: "custom",
                message: "Passwords does not match",
            });
        } else if (existingUser) {
            setError("username", {
                type: "custom",
                message: "A user with that username already exists",
            });
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
                    <form
                        className="p-2 flex flex-col"
                        onSubmit={handleSubmit(signup)}
                    >
                        <div className="flex">
                            <div className="m-2 flex flex-col w-full">
                                <Label
                                    label="First Name"
                                    error={errors.firstName}
                                />
                                <input
                                    className={`p-2 bg-gray-200 rounded-md shadow ${
                                        errors.firstName
                                            ? "border-2 border-red-400 bg-red-100"
                                            : ""
                                    }`}
                                    {...register("firstName", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <div className="m-2 flex flex-col w-full">
                                <Label
                                    label="Last Name"
                                    error={errors.lastName}
                                />

                                <input
                                    className={`p-2 bg-gray-200 rounded-md shadow ${
                                        errors.lastName
                                            ? "border-2 border-red-400 bg-red-100"
                                            : ""
                                    }`}
                                    {...register("lastName", {
                                        required: true,
                                    })}
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="m-2 flex flex-col w-full">
                                <Label
                                    label="Macro Goal"
                                    error={errors.macroRatio}
                                />
                                <select
                                    className={`p-2 bg-gray-200 rounded-md shadow ${
                                        errors.macroRatio
                                            ? "border-2 border-red-400 bg-red-100"
                                            : ""
                                    }`}
                                    {...register("macroRatio", {
                                        required: true,
                                    })}
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
                                <Label label="Sex" error={errors.sex} />
                                <select
                                    className={`p-2 bg-gray-200 rounded-md shadow ${
                                        errors.sex
                                            ? "border-2 border-red-400 bg-red-100"
                                            : ""
                                    }`}
                                    {...register("sex", {
                                        required: true,
                                    })}
                                >
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                            </div>
                        </div>
                        {watch("sex") == "F" && (
                            <div className="flex w-full">
                                <div className="p-2 flex w-1/2 items-center">
                                    <input
                                        className="mr-1"
                                        type="checkbox"
                                        {...register("isPregnant")}
                                    />
                                    <Label label="Pregnant?" />
                                </div>
                                <div className="p-2 flex w-1/2 items-center">
                                    <input
                                        className="mr-1"
                                        type="checkbox"
                                        {...register("isLactating")}
                                    />
                                    <Label label="Lactating?" />
                                </div>
                            </div>
                        )}
                        <div className="flex">
                            <div className="m-2 flex flex-col">
                                <Label label="Age" error={errors.age} />
                                <input
                                    className={`p-2 bg-gray-200 rounded-md shadow ${
                                        errors.age
                                            ? "border-2 border-red-400 bg-red-100"
                                            : ""
                                    }`}
                                    type="number"
                                    {...register("age", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <div className="m-2 flex flex-col w-full">
                                <Label
                                    label="Height (in)"
                                    error={errors.height}
                                />

                                <input
                                    className={`p-2 bg-gray-200 rounded-md shadow ${
                                        errors.height
                                            ? "border-2 border-red-400 bg-red-100"
                                            : ""
                                    }`}
                                    type="number"
                                    {...register("height", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <div className="m-2 flex flex-col w-full">
                                <Label
                                    label="Weight (lbs)"
                                    error={errors.weight}
                                />

                                <input
                                    className={`p-2 bg-gray-200 rounded-md shadow ${
                                        errors.weight
                                            ? "border-2 border-red-400 bg-red-100"
                                            : ""
                                    }`}
                                    type="number"
                                    {...register("weight", {
                                        required: true,
                                    })}
                                />
                            </div>
                        </div>
                        <div className="m-2 flex flex-col">
                            <div className="flex items-center justify-between">
                                <Label
                                    label="Username"
                                    error={errors.username}
                                />
                                {errors.username &&
                                    errors.username.type == "custom" && (
                                        <p className="text-red-600">
                                            {errors.username.message}
                                        </p>
                                    )}
                            </div>
                            <input
                                className={`p-2 bg-gray-200 rounded-md shadow ${
                                    errors.username
                                        ? "border-2 border-red-400 bg-red-100"
                                        : ""
                                }`}
                                {...register("username", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="m-2 flex flex-col">
                            <Label label="Password" error={errors.password} />
                            <input
                                className={`p-2 bg-gray-200 rounded-md shadow ${
                                    errors.password
                                        ? "border-2 border-red-400 bg-red-100"
                                        : ""
                                }`}
                                type="password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="m-2 flex flex-col">
                            <div className="flex items-center justify-between">
                                <Label
                                    label="Confirm Password"
                                    error={errors.confirmPassword}
                                />
                                {errors.confirmPassword &&
                                    errors.confirmPassword.type == "custom" && (
                                        <p className="text-red-600">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                            </div>
                            <input
                                className={`p-2 bg-gray-200 rounded-md shadow ${
                                    errors.confirmPassword
                                        ? "border-2 border-red-400 bg-red-100"
                                        : ""
                                }`}
                                type="password"
                                {...register("confirmPassword", {
                                    required: true,
                                })}
                            />
                        </div>
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
                            <div className="flex items-center">
                                {Object.entries(errors).filter((error) => {
                                    return error[1].type == "required";
                                }).length > 0 && (
                                    <p className="p-2 text-red-600">
                                        *Required Fields
                                    </p>
                                )}
                                <button
                                    className="bg-cyan-500 font-semibold rounded-md self-end p-2 m-2 text-white hover:bg-cyan-600"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Label = ({ label, error }) => {
    return (
        <label
            className={`leading-8 font-semibold ${error ? "text-red-600" : ""}`}
        >
            {error ? "*" : ""}
            {label}
        </label>
    );
};

export default SignUp;
