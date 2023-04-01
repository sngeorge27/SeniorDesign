import HeadMetadata from "../components/HeadMetadata";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { apiBaseURL } from "../constants";

export default function Goals() {
    const { user } = useAuth();
    const [RDIs, setRDIs] = useState(null);

    useEffect(() => {
        axios({
            method: "POST",
            url: apiBaseURL + "/api/goals",
            data: {
                age: user.age,
                sex: user.sex,
                isPregnant: user.isPregnant,
                isLactating: user.isLactating,
                macroRatio: user.macroRatio,
                heightInches: user.height,
                weightPounds: user.weight,
            },
        })
            .then((response) => {
                const rdiValues = response.data;
                setRDIs(groupByCategory(rdiValues));
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
    }, []);

    return (
        <div className="flex flex-col w-full h-full">
            <HeadMetadata title="Goals" />
            <Header title="My Goals"></Header>
            <div className="flex flex-col h-full overflow-auto">
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
                                }`}</p>
                                <p className="flex-1 text-right">{`${
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

function groupByCategory(arr) {
    const groupedArray = arr.reduce((group, arr) => {
        const { category } = arr;
        group[category] = group[category] ?? [];
        group[category].push(arr);
        return group;
    }, {});
    return groupedArray;
}
