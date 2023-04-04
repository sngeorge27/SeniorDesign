import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import DateNav from "../components/DateNav";
import FoodLog from "../components/FoodLog";
import NutrientProgress from "../components/NutrientProgress";
import { apiBaseURL } from "../constants";
import MainContentLayout from "../components/MainContentLayout";

export default function Track() {
    const { user, setUser } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedFood, setSelectedFood] = useState(null);
    const [nutrientValues, setNutrientValues] = useState([]);
    const [showRDIRange, setShowRDIRange] = useState(false);

    function handleDateChange(newDate) {
        setSelectedFood(null);
        setCurrentDate(newDate);
    }

    function logFood(food, amount) {
        const newFood = {
            id: food.fdc_id,
            date: new Date(currentDate),
            food: food,
            amount: amount,
        };
        setUser({ ...user, loggedFood: [...user.loggedFood, newFood] });
    }

    function deleteFood(deleteId) {
        setUser({
            ...user,
            loggedFood: user.loggedFood.filter((food) => {
                return food.id != deleteId;
            }),
        });
        setSelectedFood(null);
    }

    function calculateNutrientValues(currentNutrientValues) {
        const filteredFoods = user.loggedFood.filter((food) => {
            const foodDate = new Date(food.date);
            return (
                foodDate.getFullYear() === currentDate.getFullYear() &&
                foodDate.getMonth() === currentDate.getMonth() &&
                foodDate.getDate() === currentDate.getDate()
            );
        });

        let newNutrientValues = currentNutrientValues.map((nutrientValue) => {
            return { ...nutrientValue, amount: 0 };
        });

        if (selectedFood) {
            if (selectedFood.amount && selectedFood.amount > 0) {
                newNutrientValues = newNutrientValues.map((nutrientValue) => {
                    const foodNutrient = selectedFood.food.nutrients.find(
                        (nutrient) => {
                            return nutrient.id == nutrientValue.id;
                        }
                    );
                    const servings = selectedFood.amount / 100; // serving is 100 g
                    const newNutrientAmount =
                        nutrientValue.amount + foodNutrient.amount * servings;
                    return {
                        ...nutrientValue,
                        amount: newNutrientAmount,
                    };
                });
            }
            setNutrientValues(newNutrientValues);
        } else {
            if (filteredFoods && filteredFoods.length > 0) {
                filteredFoods.forEach((food) => {
                    if (food.amount && food.amount > 0) {
                        newNutrientValues = newNutrientValues.map(
                            (nutrientValue) => {
                                const foodNutrient = food.food.nutrients.find(
                                    (nutrient) => {
                                        return nutrient.id == nutrientValue.id;
                                    }
                                );
                                const servings = food.amount / 100; // serving is 100 g
                                const newNutrientAmount =
                                    nutrientValue.amount +
                                    foodNutrient.amount * servings;
                                return {
                                    ...nutrientValue,
                                    amount: newNutrientAmount,
                                };
                            }
                        );
                    }
                });
            }
            setNutrientValues(newNutrientValues);
        }
    }

    useEffect(() => {
        calculateNutrientValues(nutrientValues);
    }, [user, currentDate, selectedFood]);

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
                // console.log(rdiValues);
                // console.log(groupByCategory(rdiValues));

                const initialNutrientValues = [];
                rdiValues.forEach((nutrient) => {
                    const newNutrientValue = {
                        id: nutrient.id,
                        min: nutrient.RDI > 0 ? nutrient.RDI : null,
                        max: nutrient.UL > 0 ? nutrient.UL : null,
                        name: nutrient.name,
                        unit: nutrient.unitName,
                        amount: 0,
                    };
                    initialNutrientValues.push(newNutrientValue);
                });
                calculateNutrientValues(initialNutrientValues);
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
    }, []);

    return (
        <MainContentLayout tabTitle="Track" headerTitle="Track Food">
            <div className="flex flex-col items-center h-full min-h-0 overflow-hidden p-4">
                <DateNav
                    currentDate={currentDate}
                    handleDateChange={handleDateChange}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full px-4 h-full min-h-0 ">
                    <div className="p-4 h-full min-h-0">
                        <FoodLog
                            currentDate={currentDate}
                            loggedFoods={user.loggedFood ?? []}
                            logFood={logFood}
                            deleteFood={deleteFood}
                            selectedFood={selectedFood}
                            setSelectedFood={setSelectedFood}
                        />
                    </div>
                    <div className="flex flex-col m-4 p-2 mx-auto w-full overflow-auto rounded-lg bg-gray-100 shadow-md min-h-0">
                        <div className="flex justify-between items-center p-2 border-b">
                            <h2 className="text-xl font-semibold ">
                                {selectedFood
                                    ? `Nutrients for: ${selectedFood.food.shortened_name} ${selectedFood.food.emojis}`
                                    : "Day's Nutrients"}
                            </h2>
                            <div className="p-2 flex">
                                <input
                                    onChange={(e) =>
                                        setShowRDIRange(e.target.checked)
                                    }
                                    type="checkbox"
                                    name="showRDIRange"
                                    value={showRDIRange}
                                />
                                <label className="ml-2" htmlFor="showRDIRange">
                                    Show RDI?
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-col-1 overflow-y-auto overflow-x-hidden min-h-0 h-full p-2">
                            {nutrientValues &&
                                nutrientValues.length > 0 &&
                                nutrientValues.map((nutrientValue, i) => {
                                    return (
                                        <NutrientProgress
                                            key={i}
                                            name={nutrientValue.name}
                                            value={nutrientValue.amount}
                                            min={nutrientValue.min}
                                            max={nutrientValue.max}
                                            unit={nutrientValue.unit}
                                            showRanges={showRDIRange}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </MainContentLayout>
    );
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
