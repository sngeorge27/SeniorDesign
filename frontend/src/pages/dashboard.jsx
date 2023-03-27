import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import DateNav from "../components/DateNav";
import FoodLog from "../components/FoodLog";
import { testFoodLogs, testNutrients, testRDI, testFood } from "../testdata";
import NutrientProgress from "../components/NutrientProgress";

export default function Dashboard() {
    const { token } = useAuth();
    const [user, setUser] = useState();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loggedFoods, setLoggedFoods] = useState(testFoodLogs);
    const [nutrientValues, setNutrientValues] = useState(
        setInitialNutrientValues()
    );

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

    useEffect(() => {
        axios({
            method: "GET",
            url: "/api/user",
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                const res = response.data;
                setUser(res);
                console.log(user);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }, []);

    function setInitialNutrientValues() {
        const nutrientVals = [];

        testNutrients.forEach((nutrient) => {
            nutrientVals.push({
                nutrientId: nutrient.id,
                nutrientName: nutrient.name,
                amount: 0,
            });
        });

        console.log("zero", nutrientVals);

        return nutrientVals;
    }

    function calculateNutrientValues() {
        const filteredFoods = loggedFoods.filter(
            (loggedFood) =>
                loggedFood.date.getFullYear() === currentDate.getFullYear() &&
                loggedFood.date.getMonth() === currentDate.getMonth() &&
                loggedFood.date.getDate() === currentDate.getDate()
        );
        console.log(filteredFoods);
        console.log("before", nutrientValues);

        filteredFoods.forEach((food) => {
            food.food.nutrients.forEach((nutrient) => {
                setNutrientValues(
                    nutrientValues.map((val) => {
                        if (val.nutrientId === nutrient.nutrientId) {
                            const amountToBeAdded =
                                nutrient.amount *
                                (food.amount / food.food.servings);
                            const newAmount = val.amount + amountToBeAdded;
                            console.log(
                                food.food.name,
                                "amount:",
                                food.amount,
                                "serving:",
                                food.food.servings,
                                val.nutrientName,
                                "amount/serving:",
                                nutrient.amount,
                                "total added amount:",
                                amountToBeAdded,
                                "current total:",
                                val.amount,
                                "new total:",
                                newAmount
                            );
                            return {
                                ...val,
                                amount: newAmount,
                            };
                        } else {
                            return val;
                        }
                    })
                );
            });
        });

        console.log("after", nutrientValues);
    }

    useEffect(() => {
        setNutrientValues(setInitialNutrientValues());
        calculateNutrientValues();
    }, [loggedFoods, currentDate]);

    return (
        <div className="w-full flex flex-col h-full">
            <Header
                title={`Welcome ${user ? user.firstName : ""}!`}
                subtitle="Here is your overview for today"
            ></Header>
            <div className="pb-8 flex flex-col items-center h-full">
                <DateNav
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full px-4">
                    <FoodLog
                        currentDate={currentDate}
                        loggedFoods={loggedFoods}
                        logFood={logFood}
                        deleteFood={deleteFood}
                    />
                    <div className="flex flex-col p-4 mx-auto w-full overflow-hidden">
                        {testRDI.map((rdi, i) => {
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
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
