import HeadMetadata from "../components/HeadMetadata";
import Header from "../components/Header";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { apiBaseURL } from "../constants";

export default function Progress() {
    const { token } = useAuth();
    const [query, setQuery] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);

    useEffect(() => {
        async function searchFood() {
            const response = await axios({
                method: "POST",
                url: apiBaseURL + "/api/search",
                headers: {
                    Authorization: "Bearer " + token,
                },
                data: {
                    query: query,
                },
            });
            const food = response.data;
            console.log("response", food);
            setFoodItems(food);
            console.log("state", foodItems);
        }
        searchFood();
    }, [query]);

    return (
        <div>
            <HeadMetadata title="Progress" />
            <Header title="Progress"></Header>
            <div className="w-full h-full grid grid-cols-2 p-4">
                <div className="flex flex-col">
                    <div className="p-4">
                        <div className="flex flex-col p-2 w-[200px]">
                            <label className="leading-8" htmlFor="amount">
                                Find Food
                            </label>
                            <input
                                className="rounded-lg bg-gray-100 p-2 shadow"
                                type="text"
                                name="searchfood"
                                text={query}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col">
                        <p>Food:</p>
                        <br />
                        {foodItems && foodItems.length > 0 ? (
                            foodItems.map((food, i) => {
                                return (
                                    <div
                                        key={i}
                                        className={`rounded-lg hover:bg-slate-400 cursor-pointer p-2 ${
                                            selectedFood &&
                                            selectedFood.id == food.id
                                                ? "ring-1"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            selectedFood &&
                                            selectedFood.id == food.id
                                                ? setSelectedFood(null)
                                                : setSelectedFood(food);
                                        }}
                                    >
                                        <p>
                                            {food.name} - {food.id}
                                        </p>
                                    </div>
                                );
                            })
                        ) : (
                            <div>No Foods</div>
                        )}
                    </div>
                </div>
                <div className="p-4">
                    {selectedFood ? (
                        <div>
                            <p>food is selected</p>
                        </div>
                    ) : (
                        <div>
                            <p>no food selected</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
