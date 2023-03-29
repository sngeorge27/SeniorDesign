import { useState } from "react";
import AddFoodDialog from "../components/AddFoodDialog";

export default function FoodLog({
    currentDate,
    loggedFoods,
    logFood,
    deleteFood,
    selectedFood,
    setSelectedFood,
    token,
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const filteredFoods = loggedFoods.filter(
        (loggedFood) =>
            loggedFood.date.getFullYear() === currentDate.getFullYear() &&
            loggedFood.date.getMonth() === currentDate.getMonth() &&
            loggedFood.date.getDate() === currentDate.getDate()
    );

    return (
        <div className="p-2 mx-auto w-full md:max-w-lg flex flex-col items-center rounded-lg bg-gray-100 shadow-md h-full min-h-0">
            <AddFoodDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                addCallback={logFood}
                token={token}
            />
            <div className="flex justify-between w-full p-2 items-center border-b border-gray-200">
                <h1 className="font-semibold text-xl">Food Log</h1>
                <button
                    className="text-white font-semibold px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600"
                    onClick={() => {
                        setIsDialogOpen(true);
                    }}
                >
                    + Add Food
                </button>
            </div>
            <div className="flex flex-col w-full overflow-auto h-full min-h-0">
                {filteredFoods && filteredFoods.length > 0 ? (
                    filteredFoods.map((loggedFood, i) => {
                        return (
                            <div
                                key={i}
                                className={`flex justify-between items-center border-b border-gray-200 rounded-lg cursor-pointer hover:bg-gray-200 ${
                                    selectedFood &&
                                    selectedFood.id == loggedFood.id
                                        ? "shadow-lg border border-gray-400"
                                        : "last:border-b-0"
                                }`}
                            >
                                {loggedFood.food && (
                                    <button
                                        className="w-full text-left p-2"
                                        onClick={() => {
                                            if (
                                                selectedFood &&
                                                selectedFood.id == loggedFood.id
                                            ) {
                                                setSelectedFood(null);
                                            } else {
                                                setSelectedFood(loggedFood);
                                            }
                                        }}
                                    >
                                        {`${
                                            loggedFood.food.shortened_name
                                                ? loggedFood.food.shortened_name
                                                : loggedFood.food.name
                                        } ${
                                            loggedFood.food.emojis
                                                ? loggedFood.food.emojis
                                                : ""
                                        } - (${loggedFood.amount} g)`}
                                    </button>
                                )}

                                <div className="flex items-center hover:text-red-600 rounded-full">
                                    <button
                                        className="m-1 p-1 text-center"
                                        onClick={() =>
                                            deleteFood(loggedFood.id)
                                        }
                                    >
                                        <i className="fa fa-x text-sm"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center mt-4">No food logged today</p>
                )}
            </div>
        </div>
    );
}