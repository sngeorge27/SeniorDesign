import HeadMetadata from "../components/HeadMetadata";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { apiBaseURL } from "../constants";

export default function Goals() {
    const { token } = useAuth();
    const [RDIs, setRDIs] = useState(null);

    const [infoForm, setInfoForm] = useState({
        age: "21",
        sex: "M",
        isPregnant: false,
        isLactating: false,
    });

    function getRDIValues(event) {
        console.log(infoForm);

        axios({
            method: "POST",
            url: apiBaseURL + "/api/goals",
            headers: {
                Authorization: "Bearer " + token,
            },
            data: {
                age: parseFloat(infoForm.age),
                sex: infoForm.sex,
                isPregnant: infoForm.isPregnant,
                isLactating: infoForm.isLactating,
            },
        })
            .then((response) => {
                const rdiValues = response.data;
                console.log(rdiValues);
                setRDIs(groupByCategory(rdiValues));
                console.log(groupByCategory(rdiValues));
                testIteration(groupByCategory(rdiValues));
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });

        // setInfoForm({
        //     age: "",
        //     sex: "",
        //     isPregnant: false,
        //     isLactating: false,
        // });

        event.preventDefault();
    }

    function handleChange(event) {
        const { value, name, checked } = event.target;

        if (name === "sex" && value == "M") {
            setInfoForm((prevInfo) => ({
                ...prevInfo,
                [name]: value,
                isLactating: false,
                isPregnant: false,
            }));
        } else if (name == "isLactating" || name == "isPregnant") {
            setInfoForm((prevInfo) => ({
                ...prevInfo,
                [name]: checked,
            }));
        } else {
            setInfoForm((prevInfo) => ({
                ...prevInfo,
                [name]: value,
            }));
        }
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <HeadMetadata title="Goals" />
            <Header title="My Goals"></Header>
            <div className="flex flex-col h-full overflow-auto">
                <div className="flex flex-col w-[400px] mx-auto">
                    <h1 className="text-2xl font-semibold">Get RDI Test:</h1>
                    <form className="grid grid-cols-2 gap-1">
                        <div className="m-2 flex flex-col ">
                            <label className="leading-8" htmlFor="firstName">
                                Age
                            </label>
                            <input
                                className="p-2 bg-gray-100 rounded-md shadow"
                                onChange={handleChange}
                                type="number"
                                text={infoForm.age}
                                name="age"
                                value={infoForm.age}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-col ">
                            <label className="leading-8" htmlFor="lastName">
                                Sex
                            </label>
                            <select
                                className="p-2 bg-gray-100 rounded-md shadow w-full"
                                onChange={handleChange}
                                text={infoForm.sex}
                                name="sex"
                                value={infoForm.sex}
                                required
                            >
                                <option value=""></option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                        {infoForm.sex == "F" && (
                            <div className="p-2 flex">
                                <input
                                    onChange={handleChange}
                                    type="checkbox"
                                    name="isPregnant"
                                    value={infoForm.isPregnant}
                                    required
                                />
                                <label
                                    className="leading-8 ml-2"
                                    htmlFor="isPregnant"
                                >
                                    Pregnant?
                                </label>
                            </div>
                        )}
                        {infoForm.sex == "F" && (
                            <div className="p-2 flex">
                                <input
                                    onChange={handleChange}
                                    type="checkbox"
                                    name="isLactating"
                                    value={infoForm.isLactating}
                                    required
                                />
                                <label
                                    className="leading-8 ml-2"
                                    htmlFor="isLactating"
                                >
                                    Lactating?
                                </label>
                            </div>
                        )}
                    </form>
                    <button
                        className="font-semibold rounded-md self-end p-2 m-2 text-white bg-cyan-500 hover:bg-cyan-600"
                        onClick={getRDIValues}
                    >
                        Get RDI
                    </button>
                </div>
                {RDIs ? (
                    <div className="grid grid-cols-2 gap-4 p-4 h-full w-full overflow-auto">
                        {Object.entries(RDIs).map((RDIGroup, i) => {
                            return (
                                <NutrientGroups key={i} groupArr={RDIGroup} />
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center">No results</p>
                )}
            </div>
        </div>
    );
}

const NutrientGroups = ({ groupArr }) => {
    const groupName = groupArr[0];
    const nutrientRDIs = groupArr[1];

    return (
        <div className="rounded-lg border border-cyan-600 flex flex-col">
            <div className="bg-cyan-600 text-center border-b rounded-t-lg">
                <p className="font-bold py-1 text-gray-100">
                    {groupName.charAt(0).toUpperCase()}
                    {groupName.slice(1)}
                </p>
            </div>
            <div className="flex flex-col p-2">
                {nutrientRDIs.map((rdi, i) => {
                    return (
                        <div key={i} className="flex w-full justify-between">
                            <p className="font-bold">{rdi.name}</p>
                            <div className="flex">
                                <p>{`(min: ${
                                    rdi.RDI != -1
                                        ? `${rdi.RDI} ${rdi.unitName}`
                                        : "-"
                                })`}</p>
                                <p>{`(max: ${
                                    rdi.UL != -1
                                        ? `${rdi.UL} ${rdi.unitName}`
                                        : "-"
                                })`}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

function testIteration(obj) {
    Object.entries(obj).map((val) => {
        console.log(val);
    });
}

function groupByCategory(arr) {
    const groupedArray = arr.reduce((group, arr) => {
        const { category } = arr;
        group[category] = group[category] ?? [];
        group[category].push(arr);
        return group;
    }, {});
    return groupedArray;
}
