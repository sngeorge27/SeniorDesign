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
    const { user } = useAuth();

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
