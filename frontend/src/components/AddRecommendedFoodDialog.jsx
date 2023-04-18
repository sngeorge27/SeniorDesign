import { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseURL } from "../constants";
import { BiX } from "react-icons/bi";

export default function AddRecommendedFoodDialog({
    isOpen,
    setIsOpen,
    recommendedFood,
    addCallback,
}) {
    const [selectedFood, setSelectedFood] = useState(recommendedFood);
    const [foodAmount, setFoodAmount] = useState("100");

    function handleSubmit() {
        addCallback(selectedFood, foodAmount);
        setSelectedFood(null);
        setFoodAmount("");
        setIsOpen(false);
    }

    async function getFood(food) {
        const response = await axios({
            method: "POST",
            url: apiBaseURL + "/api/get_food",
            data: {
                fdc_id: food.fdc_id,
            },
        });
        const nutrients = response.data;
        setSelectedFood({ ...food, nutrients: nutrients });
    }

    useEffect(() => {
        if (selectedFood) {
            void getFood(selectedFood);
        }
    }, []);

    return (
        <>
            {isOpen && (
                <>
                    {/* Background Overlay */}
                    <div
                        className="inset-0 h-screen w-screen fixed bg-black/60 backdrop-blur-sm z-10"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    {/* Dialog */}
                    <div className="fixed bg-gray-100 top-[50%] left-[50%] rounded-xl w-[400px] h-auto -translate-x-1/2 -translate-y-1/2 flex flex-col p-4 z-20">
                        {/* Header */}
                        <div className="flex w-full justify-between items-center mb-2">
                            <p className="text-xl font-semibold">
                                Add to Food Log
                            </p>
                            <button
                                className="hover:text-red-600 rounded-full text-center text-3xl"
                                onClick={() => setIsOpen(false)}
                            >
                                <BiX />
                            </button>
                        </div>
                        {/* Content */}
                        {selectedFood && (
                            <div className="pb-4">
                                <div className="flex flex-col p-2">
                                    <label className="leading-8" htmlFor="food">
                                        Food
                                    </label>
                                    <div className="flex w-full items-center">
                                        <input
                                            className="rounded-lg bg-gray-200 p-2 shadow w-full"
                                            type="text"
                                            name="searchfood"
                                            value={`${selectedFood.shortened_name} ${selectedFood.emojis}`}
                                            placeholder="Search food"
                                            onChange={(e) =>
                                                setQuery(e.target.value)
                                            }
                                            disabled={true}
                                        ></input>
                                    </div>
                                </div>
                                <div className="flex flex-col p-2">
                                    <label
                                        className="leading-8"
                                        htmlFor="amount"
                                    >
                                        {`Servings: (g)`}
                                    </label>
                                    <input
                                        className="rounded-lg bg-gray-200 p-2 shadow"
                                        type="number"
                                        name="amount"
                                        text={foodAmount}
                                        value={foodAmount}
                                        onChange={(e) =>
                                            setFoodAmount(e.target.value)
                                        }
                                    ></input>
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex justify-end">
                            <button
                                className="text-white font-semibold px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600"
                                onClick={handleSubmit}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
