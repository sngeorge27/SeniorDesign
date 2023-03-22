import HeadMetadata from "../components/HeadMetadata";
import Header from "../components/Header";
import { useState } from "react";
import DateNav from "../components/DateNav";
import FoodLog from "../components/FoodLog";

export default function Track() {
    const [currentDate, setCurrentDate] = useState(new Date());

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
                <FoodLog currentDate={currentDate} />
            </div>
        </div>
    );
}
