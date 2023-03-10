import HeadMetadata from "../components/HeadMetadata";
import { useEffect, useState } from "react";

export default function Goals() {
    const [goalsData, setGoalsData] = useState("");

    useEffect(() => {
        fetch("/api/goals")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setGoalsData(JSON.stringify(data));
            });
    }, []);

    return (
        <div>
            <HeadMetadata title="Goals" />
            <p>goals</p>
            <p>{goalsData}</p>
        </div>
    );
}
