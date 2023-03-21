export default function DateNav({ currentDate, setCurrentDate }) {
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
                    onClick={() =>
                        setCurrentDate(
                            new Date(
                                currentDate.setDate(currentDate.getDate() - 1)
                            )
                        )
                    }
                >
                    <i className="fa fa-chevron-left"></i>
                </DateNavButton>

                <DateNavButton onClick={() => setCurrentDate(new Date())}>
                    <p className="font-semibold">Today</p>
                </DateNavButton>
                <DateNavButton
                    onClick={() =>
                        setCurrentDate(
                            new Date(
                                currentDate.setDate(currentDate.getDate() + 1)
                            )
                        )
                    }
                >
                    <i className="fa fa-chevron-right"></i>
                </DateNavButton>
            </div>
        </div>
    );
}

const DateNavButton = ({ children, ...props }) => {
    return (
        <button
            className="px-2 py-1 bg-gray-300 border border-gray-400/50 rounded-md cursor-pointer m-1 text-sm hover:shadow-sm"
            {...props}
        >
            {children}
        </button>
    );
};
