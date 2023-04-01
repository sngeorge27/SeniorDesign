export default function NutrientProgress({
    name,
    value,
    min,
    max,
    unit,
    showRanges,
}) {
    let percentageValue = 0;
    if (min) {
        percentageValue = clamp((value / min) * 100, 0, 100);
    } else if (max) {
        percentageValue = clamp((value / max) * 100, 0, 100);
    }

    let color = "bg-slate-400";
    if (max && value > max) {
        color = "bg-red-500";
    } else if ((min && value >= min) || (max && !min && value <= max)) {
        color = "bg-emerald-500";
    }

    return (
        <div className="flex flex-col p-2">
            <div className="flex items-center pl-1 leading-6 justify-between">
                <div className="flex">
                    <p className="font-semibold">{name}&nbsp;</p>
                    <p>{`- (${value && value.toFixed(2)} ${unit})`}</p>
                </div>
                {showRanges && (
                    <p>
                        {` ${min ? ` {min: ${min}}` : ""} ${
                            max ? ` {max: ${max}}` : ""
                        }`}
                    </p>
                )}
            </div>

            <ProgressBar value={percentageValue} color={color}></ProgressBar>
        </div>
    );
}

const ProgressBar = ({ value, color }) => {
    return (
        <div className="w-full h-[20px] bg-gray-300 rounded-full overflow-hidden">
            <div
                className={`h-full w-full flex-1 transition-all ${
                    color ? color : "bg-gray-400"
                }`}
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            ></div>
        </div>
    );
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
