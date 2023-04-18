import { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseURL, buttonStyle } from "../constants";
import { BiX } from "react-icons/bi";

export default function AddFoodDialog({ isOpen, setIsOpen, addCallback }) {
    const [selectedFood, setSelectedFood] = useState(null);
    const [query, setQuery] = useState("");
    const [foodAmount, setFoodAmount] = useState("100");
    const [foodItems, setFoodItems] = useState([]);

    function handleSubmit() {
        addCallback(selectedFood, foodAmount);
        setSelectedFood(null);
        setFoodAmount("100");
        setQuery("");
        setIsOpen(false);
    }

    async function getFood(foodItem) {
        const response = await axios({
            method: "POST",
            url: apiBaseURL + "/api/get_food",
            data: {
                fdc_id: foodItem.fdc_id,
            },
        });
        const nutrients = response.data;
        setSelectedFood({ ...foodItem, nutrients: nutrients });
    }

    function handleFoodClick(id) {
        void getFood(id);
    }

    useEffect(() => {
        async function searchFood() {
            const response = await axios({
                method: "POST",
                url: apiBaseURL + "/api/search",
                data: {
                    query: query,
                },
            });
            const food = response.data;
            setFoodItems(food);
        }
        searchFood();
    }, [query]);

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
                            <p className="text-xl font-semibold">Add Food</p>
                            <button
                                className="hover:text-red-600 rounded-full text-center text-3xl"
                                onClick={() => setIsOpen(false)}
                            >
                                <BiX />
                            </button>
                        </div>
                        {/* Content */}
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
                                        value={
                                            selectedFood
                                                ? `${selectedFood.shortened_name} ${selectedFood.emojis}`
                                                : query
                                        }
                                        placeholder="Search food"
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        disabled={selectedFood}
                                    ></input>
                                    <button
                                        className="ml-3 hover:text-red-600 rounded-full text-center text-3xl"
                                        onClick={() => setSelectedFood(null)}
                                    >
                                        <BiX />
                                    </button>
                                </div>
                            </div>
                            {!selectedFood && (
                                <div className="p-4 flex flex-col h-[200px] overflow-auto">
                                    {foodItems && foodItems.length > 0 ? (
                                        foodItems.map((food, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={`rounded-lg hover:bg-slate-400 cursor-pointer p-2 ${
                                                        selectedFood &&
                                                        selectedFood.id ==
                                                            food.id
                                                            ? "ring-1"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        handleFoodClick(food);
                                                    }}
                                                >
                                                    <p>
                                                        {`${food.shortened_name} ${food.emojis}`}
                                                    </p>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div>No foods found</div>
                                    )}
                                </div>
                            )}
                            {selectedFood && (
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
                            )}
                        </div>
                        {/* Footer */}
                        <div className="flex justify-end">
                            <button
                                className={buttonStyle}
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
