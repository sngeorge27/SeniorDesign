import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function DateNav({ currentDate, handleDateChange }) {
    return (
        <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">
                {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
            </p>
            <p>
                {currentDate.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                })}
            </p>
            <div className="flex">
                <DateNavButton
                    isIcon={true}
                    onClick={() =>
                        handleDateChange(
                            new Date(
                                currentDate.setDate(currentDate.getDate() - 1)
                            )
                        )
                    }
                >
                    <BiChevronLeft />
                </DateNavButton>
                <DateNavButton onClick={() => handleDateChange(new Date())}>
                    <p className="font-semibold">Today</p>
                </DateNavButton>
                <DateNavButton
                    isIcon={true}
                    onClick={() =>
                        handleDateChange(
                            new Date(
                                currentDate.setDate(currentDate.getDate() + 1)
                            )
                        )
                    }
                >
                    <BiChevronRight />
                </DateNavButton>
            </div>
        </div>
    );
}

const DateNavButton = ({ children, isIcon = false, ...props }) => {
    return (
        <button
            className={`px-2 py-1 bg-gray-300 border border-gray-400/50 rounded-md cursor-pointer m-1 text-sm hover:shadow-sm ${
                isIcon ? "text-xl" : ""
            }`}
            {...props}
        >
            {children}
        </button>
    );
};
