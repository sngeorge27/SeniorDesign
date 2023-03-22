import { useState } from "react";
import AddFoodDialog from "../components/AddFoodDialog";
import { testFood } from "../testdata";

export default function FoodLog({ currentDate }) {
    const [loggedFoods, setLoggedFoods] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function logFood(id, amount) {
        console.log(id, amount);
        const food = testFood.find((food) => food.id == id);
        const newFood = {
            id: Math.random().toFixed(2),
            date: currentDate,
            food: food,
            amount: amount,
        };
        setLoggedFoods([...loggedFoods, newFood]);
        console.log(newFood);
        console.log(loggedFoods);
    }

    function deleteFood(deleteId) {
        setLoggedFoods(
            loggedFoods.filter((food) => {
                return food.id !== deleteId;
            })
        );
        console.log(loggedFoods);
    }

    return (
        <div className="p-2 m-2 mx-auto w-full md:max-w-lg flex flex-col items-center rounded-lg bg-gray-100 shadow-md h-full">
            <div className="flex justify-between w-full p-2 items-center border-b border-gray-200">
                <h1 className="font-semibold text-xl">Food Log</h1>
                <button
                    className="text-white font-semibold px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600"
                    onClick={() => {
                        // console.log(loggedFoods);
                        // logFood();
                        setIsDialogOpen(true);
                    }}
                >
                    + Add Food
                </button>
                <AddFoodDialog
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                    addCallback={logFood}
                />
            </div>
            <div className="flex flex-col w-full overflow-auto h-full">
                {loggedFoods && loggedFoods.length > 0 ? (
                    loggedFoods
                        .filter(
                            (loggedFood) =>
                                loggedFood.date.getDate() ===
                                currentDate.getDate()
                        )
                        .map((loggedFood, i) => {
                            return (
                                <div
                                    key={i}
                                    className="flex justify-between items-center p-2 border-b border-gray-200 last:border-0"
                                >
                                    {loggedFood.food && (
                                        <p>
                                            {loggedFood.food.name} - (
                                            {loggedFood.amount}{" "}
                                            {loggedFood.food.unit})
                                        </p>
                                    )}

                                    <div className="flex items-center">
                                        {/* <button
                                            className="m-1 hover:text-cyan-600 rounded-full text-center"
                                            onClick={() =>
                                                console.log(
                                                    `edit food with id: ${loggedFood.id}`
                                                )
                                            }
                                        >
                                            <i className="fa fa-pen-to-square text-sm"></i>
                                        </button> */}
                                        <button
                                            className="m-1 hover:text-red-600 rounded-full text-center"
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
