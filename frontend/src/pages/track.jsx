import HeadMetadata from "../components/HeadMetadata";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import DateNav from "../components/DateNav";

export default function Track() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loggedFoods, setLoggedFoods] = useState([]);

    useEffect(() => {
        console.log(
            `fetch foods logged on: ${currentDate.toLocaleDateString("en-US")}`
        );
    }, [currentDate, loggedFoods]);

    function logFood() {
        const newFood = {
            id: Math.random().toFixed(2),
            name: "Food",
            date: currentDate,
        };
        if (loggedFoods && loggedFoods.length > 0) {
            setLoggedFoods([...loggedFoods, newFood]);
        } else {
            setLoggedFoods([newFood]);
        }
    }

    function deleteFood(deleteId) {
        setLoggedFoods(
            loggedFoods.filter((food) => {
                return food.id !== deleteId;
            })
        );
    }

    // Need to fix overflow issue
    return (
        <div className="h-full flex flex-col">
            <HeadMetadata title="Track" />
            <Header title="Track"></Header>
            <div className="pb-8 flex flex-col items-center h-full">
                <DateNav
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                />
                <div className="p-2 m-2 mx-auto w-full md:max-w-lg flex flex-col items-center rounded-lg bg-gray-100 shadow-md h-full">
                    <div className="flex justify-between w-full p-2 items-center border-b border-gray-200">
                        <h1 className="font-semibold text-xl">Food Log</h1>
                        <button
                            className="text-white font-semibold px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600"
                            onClick={logFood}
                        >
                            + Add Food
                        </button>
                    </div>
                    <div className="flex flex-col w-full overflow-auto h-full">
                        {loggedFoods && loggedFoods.length > 0 ? (
                            loggedFoods.map((food, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center p-2 border-b border-gray-200 last:border-0"
                                    >
                                        <p>ID: {food.id}</p>
                                        <div className="flex items-center">
                                            <button
                                                className="m-1 hover:text-cyan-600 rounded-full text-center"
                                                onClick={() =>
                                                    console.log(
                                                        `edit food with id: ${food.id}`
                                                    )
                                                }
                                            >
                                                <i className="fa fa-pen-to-square text-sm"></i>
                                            </button>
                                            <button
                                                className="m-1 hover:text-red-600 rounded-full text-center"
                                                onClick={() =>
                                                    deleteFood(food.id)
                                                }
                                            >
                                                <i className="fa fa-x text-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center mt-4">
                                No food logged today
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
