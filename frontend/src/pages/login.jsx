import { useAuth } from "../hooks/useAuth";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
    const { user, setUser } = useAuth();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    function login(loginForm) {
        const loginUser = JSON.parse(
            localStorage.getItem(`${loginForm.username}`)
        );

        if (!loginUser) {
            setError("username", {
                type: "custom",
                message: "User doesn't exist",
            });
        } else if (loginUser && loginUser.password != loginForm.password) {
            setError("password", {
                type: "custom",
                message: "Incorrect password",
            });
        } else if (loginUser && loginUser.password == loginForm.password) {
            setUser(loginUser);
        }
    }
    if (user) {
        return <Navigate to="/" return replace state={{ from: location }} />;
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
                    <form
                        className="p-2 flex flex-col"
                        onSubmit={handleSubmit(login)}
                    >
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
                            <div className="flex items-center justify-between">
                                <Label
                                    label="Password"
                                    error={errors.password}
                                />
                                {errors.password &&
                                    errors.password.type == "custom" && (
                                        <p className="text-red-600">
                                            {errors.password.message}
                                        </p>
                                    )}
                            </div>
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
                        {Object.entries(errors).filter((error) => {
                            return error[1].type == "required";
                        }).length > 0 && (
                            <p className="p-2 text-red-600">*Required Fields</p>
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
                                type="submit"
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

export default Login;
