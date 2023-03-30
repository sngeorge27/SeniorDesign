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
        macroRatio: "maintain",
        weight: 180,
        heightFeet: 5,
        heightInches: 6
    });

    useEffect(() => {
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
              macroRatio: infoForm.macroRatio,
              heightInches: parseFloat(infoForm.heightFeet) * 12 + parseFloat(infoForm.heightInches),
              weightPounds: parseFloat(infoForm.weight)
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

    }, [infoForm])

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
        <div className="flex flex-col w-full h-full">
            <HeadMetadata title="Goals" />
            <Header title="My Goals"></Header>
            <div className="flex flex-col h-full overflow-auto">
                <div className="flex flex-col w-[720px] mx-auto">
                    <form className="grid grid-cols-3 gap-1">
                    <div className="m-2 flex flex-col ">
                            <label className="leading-8" htmlFor="lastName">
                                Macro goal
                            </label>
                            <select
                                className="p-2 bg-gray-100 rounded-md shadow w-full"
                                onChange={handleChange}
                                text={infoForm.macroRatio}
                                name="macroRatio"
                                value={infoForm.macroRatio}
                                required
                            >
                                <option value="maintain">Maintenance</option>
                                <option value="loss">Weight loss</option>
                                <option value="gain">Muscle gain</option>
                                <option value="keto">Keto</option>
                            </select>
                        </div>
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
                        <div className="m-2 flex flex-col ">
                            <label className="leading-8" htmlFor="firstName">
                                Weight (lbs)
                            </label>
                            <input
                                className="p-2 bg-gray-100 rounded-md shadow"
                                onChange={handleChange}
                                type="number"
                                text={infoForm.weight}
                                name="weight"
                                value={infoForm.weight}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-col ">
                            <label className="leading-8" htmlFor="firstName">
                                Height (feet)
                            </label>
                            <input
                                className="p-2 bg-gray-100 rounded-md shadow"
                                onChange={handleChange}
                                type="number"
                                text={infoForm.heightFeet}
                                name="heightFeet"
                                value={infoForm.heightFeet}
                                required
                            />
                        </div>
                        <div className="m-2 flex flex-col ">
                            <label className="leading-8" htmlFor="firstName">
                                Height (inches)
                            </label>
                            <input
                                className="p-2 bg-gray-100 rounded-md shadow"
                                onChange={handleChange}
                                type="number"
                                text={infoForm.heightInches}
                                name="heightInches"
                                value={infoForm.heightInches}
                                required
                            />
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
            <div className="fle flex-col p-2">
              <div className="flex font-bold border-b-2 mb-2 border-cyan-600">
                <p className="flex-1">Nutrient</p>
                <div className="flex-1 flex">
                  <p className="flex-1 text-right">RDI</p>
                  <p className="flex-1 text-right">Upper limit</p>
                </div>
              </div>
                {nutrientRDIs.map((rdi, i) => {
                    return (
                        <div key={i} className="flex w-full justify-between">
                            <p className="flex-1 font-bold">{rdi.name}</p>
                            <div className="flex-1 flex">
                                <p className="flex-1 text-right">{`${
                                    rdi.RDI != -1
                                        ? `${rdi.RDI} ${rdi.unitName}`
                                        : `0 ${rdi.unitName}`
                                }`}</p><p className="flex-1 text-right">{`${
                                    rdi.UL != -1
                                        ? `${rdi.UL} ${rdi.unitName}`
                                        : ""
                                }`}</p>
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
