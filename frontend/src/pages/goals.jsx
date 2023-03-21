import HeadMetadata from "../components/HeadMetadata";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function Goals() {
    const { token } = useAuth();
    const [RDI, setRDI] = useState(null);

    const [infoForm, setInfoForm] = useState({
        age: "21",
        sex: "male",
    });

    function getRDIValues(event) {
        console.log(infoForm);

        axios({
            method: "POST",
            url: "/api/goals",
            headers: {
                Authorization: "Bearer " + token,
            },
            data: {
                age: infoForm.age,
                sex: infoForm.sex,
            },
        })
            .then((response) => {
                const rdiValues = JSON.stringify(response.data);
                setRDI(rdiValues);
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                }
            });

        setInfoForm({
            age: "",
            age: "",
        });

        event.preventDefault();
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setInfoForm((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    }

    return (
        <div>
            <HeadMetadata title="Goals" />
            <Header title="My Goals"></Header>
            <div className="flex flex-col w-[400px] mx-auto ">
                <h1 className="text-2xl font-semibold">Get RDI Test:</h1>
                <form className="grid grid-cols-2 gap-1">
                    <div className="m-2 flex flex-col ">
                        <label className="leading-8" htmlFor="firstName">
                            Age
                        </label>
                        <input
                            className="p-2 bg-gray-100 rounded-md shadow"
                            onChange={handleChange}
                            type="number"
                            text={infoForm.age}
                            name="age"
                            value={infoForm.age}
                            required
                        />
                    </div>
                    <div className="m-2 flex flex-col ">
                        <label className="leading-8" htmlFor="lastName">
                            Sex
                        </label>
                        <select
                            className="p-2 bg-gray-100 rounded-md shadow w-full"
                            onChange={handleChange}
                            text={infoForm.sex}
                            name="sex"
                            value={infoForm.sex}
                            required
                        >
                            <option selected value=""></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </form>
                <button
                    className="bg-sky-500 font-semibold rounded-md self-end p-2 m-2 text-white hover:bg-sky-600"
                    onClick={getRDIValues}
                >
                    Get RDI
                </button>
                {RDI && <p>{RDI}</p>}
            </div>
        </div>
    );
}
