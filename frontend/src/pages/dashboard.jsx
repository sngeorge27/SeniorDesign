import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import DateNav from "../components/DateNav";
import FoodLog from "../components/FoodLog";
import { testFoodLogs, testNutrients, testRDI, testFood } from "../testdata";
import NutrientProgress from "../components/NutrientProgress";
import { apiBaseURL } from "../constants";

export default function Dashboard() {
    const { token } = useAuth();
    const [user, setUser] = useState();

    useEffect(() => {
        axios({
            method: "GET",
            url: apiBaseURL + "/api/user",
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
                <p>recommendations can go here</p>
            </div>
        </div>
    );
}
