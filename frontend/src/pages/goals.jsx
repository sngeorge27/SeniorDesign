import Head from "../components/Head";
import { useEffect } from "react";
import axios from "axios";

export default function Goals() {
    useEffect(() => {
        // const exampleApiUrl = "http://localhost:5000/goals";
        fetch("/api/goals").then((res) => {
            console.log(res);
        });
    }, []);

    return (
        <div>
            <Head title="Goals" />
            <p>goals</p>
        </div>
    );
}
