import HeadMetadata from "../components/HeadMetadata";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import CheckBox from "../components/CheckBox";
import { useForm } from "react-hook-form";

export default function Profile() {
    const { user, setUser } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            sex: user.sex,
            isPregnant: user.isPregnant,
            isLactating: user.isLactating,
            macroRatio: user.macroRatio,
            height: user.height,
            weight: user.weight,
        },
    });

    function saveProfileChanges(profileForm) {
        const updatedUser = {
            ...user,
            firstName: profileForm.firstName,
            lastName: profileForm.lastName,
            age: parseInt(profileForm.age),
            sex: profileForm.sex,
            isPregnant: profileForm.isPregnant,
            isLactating: profileForm.isLactating,
            macroRatio: profileForm.macroRatio,
            height: parseFloat(profileForm.height),
            weight: parseFloat(profileForm.weight),
        };

        setUser(updatedUser);
        reset(updatedUser);
    }

    return (
        <div className="w-full h-full">
            <HeadMetadata title="Profile" />
            <Header title="Profile" showProfile={false}></Header>
            <div className="min-h-[200px] min-w-[400px] w-[80%] flex flex-col p-4 items-center mx-auto">
                <form
                    className="p-2 flex flex-col"
                    onSubmit={handleSubmit(saveProfileChanges)}
                >
                    <div className="flex">
                        <div className="m-2 flex flex-col w-full">
                            <Label
                                label="First Name"
                                error={errors.firstName}
                            />
                            <input
                                className={`p-2 bg-gray-100 rounded-md shadow ${
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
                            <Label label="Last Name" error={errors.lastName} />

                            <input
                                className={`p-2 bg-gray-100 rounded-md shadow ${
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
                                className={`p-2 bg-gray-100 rounded-md shadow ${
                                    errors.macroRatio
                                        ? "border-2 border-red-400 bg-red-100"
                                        : ""
                                }`}
                                {...register("macroRatio", {
                                    required: true,
                                })}
                            >
                                <option value="maintain">Maintenance</option>
                                <option value="loss">Weight loss</option>
                                <option value="gain">Muscle gain</option>
                                <option value="keto">Keto</option>
                            </select>
                        </div>
                        <div className="m-2 flex flex-col w-full">
                            <Label label="Sex" error={errors.sex} />
                            <select
                                className={`p-2 bg-gray-100 rounded-md shadow ${
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
                                className={`p-2 bg-gray-100 rounded-md shadow ${
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
                            <Label label="Height (in)" error={errors.height} />

                            <input
                                className={`p-2 bg-gray-100 rounded-md shadow ${
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
                            <Label label="Weight (lbs)" error={errors.weight} />

                            <input
                                className={`p-2 bg-gray-100 rounded-md shadow ${
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
                    <div className="flex p-2 justify-end items-center">
                        {Object.entries(errors).filter((error) => {
                            return error[1].type == "required";
                        }).length > 0 && (
                            <p className="p-2 text-red-600">*Required Fields</p>
                        )}
                        <button
                            className="bg-cyan-500 font-semibold rounded-md p-2 m-2 text-white hover:bg-cyan-600 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={!isDirty}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

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
