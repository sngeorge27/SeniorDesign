import HeadMetadata from "../components/HeadMetadata";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import CheckBox from "../components/CheckBox";

export default function Profile() {
    const { user, setUser } = useAuth();
    const [profileForm, setProfileForm] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        sex: user.sex,
        isPregnant: user.isPregnant,
        isLactating: user.isLactating,
        macroRatio: user.macroRatio,
        height: user.height,
        weight: user.weight,
    });
    const [errorMessage, setErrorMessage] = useState(null);

    function saveProfileChanges(event) {
        // Add validation to ensure all fields have values

        setUser({
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
        });

        event.preventDefault();
    }

    function handleChange(event) {
        const { value, name } = event.target;

        if ((name === "sex" && value == "M") || value == "") {
            setProfileForm((prevInfo) => ({
                ...prevInfo,
                [name]: value,
                isLactating: false,
                isPregnant: false,
            }));
        } else {
            setProfileForm((prevInfo) => ({
                ...prevInfo,
                [name]: value,
            }));
        }
    }

    return (
        <div className="w-full h-full">
            <HeadMetadata title="Profile" />
            <Header title="Profile" showProfile={false}></Header>
            <div className="min-h-[200px] min-w-[400px] w-[80%] flex flex-col p-4 items-center mx-auto">
                <form className="p-2 flex flex-col">
                    <div className="flex">
                        <div className="m-2 flex flex-col w-full">
                            <label
                                className="leading-8 font-semibold"
                                htmlFor="firstName"
                            >
                                First Name
                            </label>
                            <input
                                className="p-2 bg-gray-100 rounded-md shadow"
                                onChange={handleChange}
                                type="text"
                                text={profileForm.firstName}
                                name="firstName"
                                value={profileForm.firstName}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-col w-full">
                            <label
                                className="leading-8 font-semibold"
                                htmlFor="lastName"
                            >
                                Last Name
                            </label>
                            <input
                                className="p-2 bg-gray-100 rounded-md shadow"
                                onChange={handleChange}
                                type="text"
                                text={profileForm.lastName}
                                name="lastName"
                                value={profileForm.lastName}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="m-2 flex flex-col w-full">
                            <label
                                className="leading-8 font-semibold"
                                htmlFor="macroRatio"
                            >
                                Macro Goal
                            </label>
                            <select
                                className="p-2 bg-gray-100 rounded-md shadow"
                                onChange={handleChange}
                                text={profileForm.macroRatio}
                                name="macroRatio"
                                value={profileForm.macroRatio}
                                required
                            >
                                <option value="maintain">Maintenance</option>
                                <option value="loss">Weight loss</option>
                                <option value="gain">Muscle gain</option>
                                <option value="keto">Keto</option>
                            </select>
                        </div>
                        <div className="m-2 flex flex-col w-full">
                            <label
                                className="leading-8 font-semibold"
                                htmlFor="sex"
                            >
                                Sex
                            </label>
                            <select
                                className="p-2 bg-gray-100 rounded-md shadow"
                                onChange={handleChange}
                                text={profileForm.sex}
                                name="sex"
                                value={profileForm.sex}
                                required
                            >
                                <option value=""></option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                    </div>
                    {profileForm.sex == "F" && (
                        <div className="flex w-full">
                            <div className="p-2 flex w-1/2 items-center">
                                {/* <input
                                        onChange={handleChange}
                                        type="checkbox"
                                        name="isPregnant"
                                        value={profileForm.isPregnant}
                                        required
                                    /> */}
                                <CheckBox
                                    checked={profileForm.isPregnant}
                                    setChecked={() =>
                                        setProfileForm({
                                            ...profileForm,
                                            isPregnant: !profileForm.isPregnant,
                                        })
                                    }
                                />
                                <label
                                    className="leading-8 ml-2 font-semibold"
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
                                        value={profileForm.isLactating}
                                        required
                                    /> */}
                                <CheckBox
                                    checked={profileForm.isLactating}
                                    setChecked={() =>
                                        setProfileForm({
                                            ...profileForm,
                                            isLactating:
                                                !profileForm.isLactating,
                                        })
                                    }
                                />
                                <label
                                    className="leading-8 ml-2 font-semibold"
                                    htmlFor="isLactating"
                                >
                                    Lactating?
                                </label>
                            </div>
                        </div>
                    )}
                    <div className="flex">
                        <div className="m-2 flex flex-col">
                            <label
                                className="leading-8 font-semibold"
                                htmlFor="age"
                            >
                                Age
                            </label>
                            <input
                                className="p-2 bg-gray-100 rounded-md shadow"
                                onChange={handleChange}
                                type="number"
                                text={profileForm.age}
                                name="age"
                                value={profileForm.age}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-col w-full">
                            <label
                                className="leading-8 font-semibold"
                                htmlFor="height"
                            >
                                Height (in)
                            </label>
                            <input
                                className="p-2 bg-gray-100 rounded-md shadow"
                                onChange={handleChange}
                                type="number"
                                text={profileForm.height}
                                name="height"
                                value={profileForm.height}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-col w-full">
                            <label
                                className="leading-8 font-semibold"
                                htmlFor="weight"
                            >
                                Weight (lbs)
                            </label>
                            <input
                                className="p-2 bg-gray-100 rounded-md shadow"
                                onChange={handleChange}
                                type="number"
                                text={profileForm.weight}
                                name="weight"
                                value={profileForm.weight}
                                required
                            />
                        </div>
                    </div>
                    {errorMessage && (
                        <p className="p-2 text-red-700">{errorMessage}</p>
                    )}
                    <div className="flex p-2 justify-end items-center">
                        <button
                            className="bg-cyan-500 font-semibold rounded-md self-end p-2 m-2 text-white hover:bg-cyan-600"
                            onClick={saveProfileChanges}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
