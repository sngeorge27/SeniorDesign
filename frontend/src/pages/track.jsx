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
    const [selectedFood, setSelectedFood] = useState(null);
    const [nutrientValues, setNutrientValues] = useState([]);
    const [showRDIRange, setShowRDIRange] = useState(false);

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
        setSelectedFood(null);
    }

    function calculateNutrientValues() {
        const filteredFoods = loggedFoods.filter(
            (loggedFood) =>
                loggedFood.date.getFullYear() === currentDate.getFullYear() &&
                loggedFood.date.getMonth() === currentDate.getMonth() &&
                loggedFood.date.getDate() === currentDate.getDate()
        );

        let newNutrientValues = nutrientValues.map((nutrientValue) => {
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
        calculateNutrientValues();
    }, [loggedFoods, currentDate, selectedFood]);

    // Change to fetch profile info from db
    useEffect(() => {
        axios({
            method: "POST",
            url: apiBaseURL + "/api/goals",
            headers: {
                Authorization: "Bearer " + token,
            },
            data: {
                age: 23,
                sex: "M",
                isPregnant: false,
                isLactating: false,
            },
        })
            .then((response) => {
                const rdiValues = response.data;
                //console.log(rdiValues);
                //console.log(groupByCategory(rdiValues));

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
                setNutrientValues(initialNutrientValues);
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
    }, []);

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

                    <div className="flex flex-col p-4 mx-auto w-full overflow-auto">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold pb-2">
                                {selectedFood
                                    ? `Nutrients for: ${selectedFood.food.shortened_name} ${selectedFood.food.emojis}`
                                    : "Food Log Nutrients"}
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
                                <label
                                    className="leading-8 ml-2"
                                    htmlFor="showRDIRange"
                                >
                                    Show RDI Ranges?
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col overflow-y-auto overflow-x-hidden">
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
        </div>
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
