import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import DateNav from "../components/DateNav";
import FoodLog from "../components/FoodLog";
import { testNutrients, testRDI } from "../testdata";
import NutrientProgress from "../components/NutrientProgress";

export default function Dashboard() {
    const { token } = useAuth();
    const [user, setUser] = useState();
    const [currentDate, setCurrentDate] = useState(new Date());

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
                    <FoodLog currentDate={currentDate} />
                    <div className="flex flex-col p-4 w-full overflow-hidden">
                        {testRDI.map((rdi) => {
                            const nutrient = testNutrients.find(
                                (n) => n.id == rdi.nutrientId
                            );
                            return (
                                <NutrientProgress
                                    name={nutrient.name}
                                    value={parseFloat(
                                        (Math.random() * 25).toFixed(2)
                                    )}
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
