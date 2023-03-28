import HeadMetadata from "../components/HeadMetadata";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import DateNav from "../components/DateNav";
import FoodLog from "../components/FoodLog";
// import { testFoodLogs, testNutrients, testRDI, testFood } from "../testdata";
import NutrientProgress from "../components/NutrientProgress";
import { apiBaseURL } from "../constants";

export default function Track() {
    const { token } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loggedFoods, setLoggedFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [nutrientValues, setNutrientValues] = useState([]);

    function handleDateChange(newDate) {
        setSelectedFood(null);
        setCurrentDate(newDate);
    }

    function logFood(food, amount) {
        console.log(food, amount);
        const newFood = {
            id: food.fdc_id,
            date: new Date(currentDate),
            food: food,
            amount: amount,
        };
        setLoggedFoods([...loggedFoods, newFood]);
    }

    function deleteFood(deleteId) {
        setLoggedFoods(
            loggedFoods.filter((food) => {
                return food.id !== deleteId;
            })
        );
    }

    // function calculateNutrientValues() {
    //     const filteredFoods = loggedFoods.filter(
    //         (loggedFood) =>
    //             loggedFood.date.getFullYear() === currentDate.getFullYear() &&
    //             loggedFood.date.getMonth() === currentDate.getMonth() &&
    //             loggedFood.date.getDate() === currentDate.getDate()
    //     );

    //     filteredFoods.forEach((food) => {
    //         food.food.nutrients.forEach((nutrient) => {
    //             setNutrientValues(
    //                 nutrientValues.map((val) => {
    //                     if (val.nutrientId === nutrient.nutrientId) {
    //                         const amountToBeAdded =
    //                             nutrient.amount *
    //                             (food.amount / food.food.servings);
    //                         const newAmount = val.amount + amountToBeAdded;
    //                         console.log(
    //                             food.food.name,
    //                             "amount:",
    //                             food.amount,
    //                             "serving:",
    //                             food.food.servings,
    //                             val.nutrientName,
    //                             "amount/serving:",
    //                             nutrient.amount,
    //                             "total added amount:",
    //                             amountToBeAdded,
    //                             "current total:",
    //                             val.amount,
    //                             "new total:",
    //                             newAmount
    //                         );
    //                         return {
    //                             ...val,
    //                             amount: newAmount,
    //                         };
    //                     } else {
    //                         return val;
    //                     }
    //                 })
    //             );
    //         });
    //     });
    // }

    useEffect(() => {
        const filteredFoods = loggedFoods.filter(
            (loggedFood) =>
                loggedFood.date.getFullYear() === currentDate.getFullYear() &&
                loggedFood.date.getMonth() === currentDate.getMonth() &&
                loggedFood.date.getDate() === currentDate.getDate()
        );
        setFilteredFoods(filteredFoods);

        // calculateNutrientValues();
    }, [loggedFoods, currentDate]);

    return (
        <div className="flex flex-col w-full">
            <HeadMetadata title="Track" />
            <Header title="Track Food"></Header>
            <div className="flex flex-col items-center h-full min-h-0 overflow-hidden">
                <DateNav
                    currentDate={currentDate}
                    handleDateChange={handleDateChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 w-full px-4 h-full min-h-0">
                    <div className="p-4 h-full min-h-0">
                        <FoodLog
                            currentDate={currentDate}
                            loggedFoods={loggedFoods}
                            logFood={logFood}
                            deleteFood={deleteFood}
                            selectedFood={selectedFood}
                            setSelectedFood={setSelectedFood}
                            token={token}
                        />
                    </div>

                    <div className="flex flex-col p-4 mx-auto w-full overflow-auto ">
                        {/* {testRDI.map((rdi, i) => {
                            const nutrient = testNutrients.find(
                                (n) => n.id == rdi.nutrientId
                            );
                            const nutrientValue =
                                nutrientValues && nutrientValues.length > 0
                                    ? nutrientValues.find(
                                          (n) => n.nutrientId == rdi.nutrientId
                                      ).amount
                                    : 0;
                            return (
                                <NutrientProgress
                                    key={i}
                                    name={nutrient.name}
                                    value={nutrientValue}
                                    min={rdi.min}
                                    max={rdi.max}
                                />
                            );
                        })} */}
                        {selectedFood ? (
                            <div className="flex flex-col overflow-y-auto overflow-x-hidden">
                                <h1 className="text-xl font-bold">
                                    Selected Food:
                                </h1>
                                <p>{JSON.stringify(selectedFood)}</p>
                            </div>
                        ) : filteredFoods && filteredFoods.length > 0 ? (
                            <div className="text-center">
                                all logged nutrients
                            </div>
                        ) : (
                            <div className="text-center">no nutrients</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
