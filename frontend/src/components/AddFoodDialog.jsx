import { useState } from "react";
import { testFood } from "../testdata";

export default function AddFoodDialog({ isOpen, setIsOpen, addCallback }) {
    const [addFoodForm, setAddFoodForm] = useState({
        foodId: "",
        amount: "",
    });

    function handleChange(event) {
        const { value, name } = event.target;
        setAddFoodForm((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

    function handleSubmit() {
        console.log(addFoodForm);
        addCallback(addFoodForm.foodId, addFoodForm.amount);
        setAddFoodForm({
            foodId: "",
            amount: "",
        });
        setIsOpen(false);
    }

    return (
        <>
            {isOpen && (
                <>
                    {/* Background Overlay */}
                    <div
                        className="inset-0 h-screen w-screen fixed bg-black/60 backdrop-blur-sm z-5"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    {/* Dialog */}
                    <div className="fixed bg-gray-100 top-[50%] left-[50%] rounded-xl min-w-[400px] h-auto -translate-x-1/2 -translate-y-1/2 flex flex-col p-4 z-10">
                        {/* Header */}
                        <div className="flex w-full justify-between items-center mb-2">
                            <p className="text-xl font-semibold">Add Food</p>
                            <button
                                className="m-1 hover:text-red-600 rounded-full text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                <i className="fa fa-x text-md font-semibold"></i>
                            </button>
                        </div>
                        {/* Content */}
                        <div className="pb-4">
                            <div className="flex flex-col p-2">
                                <label className="leading-8" htmlFor="food">
                                    Food
                                </label>
                                <select
                                    className="rounded-lg bg-gray-200 p-2 shadow"
                                    name="foodId"
                                    text={addFoodForm.foodId}
                                    value={addFoodForm.foodId}
                                    onChange={handleChange}
                                >
                                    <option value=""></option>
                                    {testFood.map((food, i) => {
                                        return (
                                            <option value={food.id} key={i}>
                                                {food.name} - ({food.unit})
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="flex flex-col p-2">
                                <label className="leading-8" htmlFor="amount">
                                    Servings
                                </label>
                                <input
                                    className="rounded-lg bg-gray-200 p-2 shadow"
                                    type="number"
                                    name="amount"
                                    text={addFoodForm.amount}
                                    value={addFoodForm.amount}
                                    onChange={handleChange}
                                ></input>
                            </div>
                        </div>
                        {/* Footer */}
                        <div className="flex justify-end">
                            <button
                                className="text-white font-semibold px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
