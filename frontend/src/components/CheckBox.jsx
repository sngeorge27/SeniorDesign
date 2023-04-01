export default function CheckBox({ checked, setChecked }) {
    return (
        <button
            type="button"
            className={`h-[25px] w-[25px] rounded-md border flex items-center justify-center transition-all shadow-sm ${
                checked
                    ? "border-cyan-600 bg-cyan-600"
                    : "border-gray-300 bg-gray-200"
            }`}
            onClick={() => setChecked(!checked)}
        >
            <i
                className={`fa fa-check text-sm font-bold transition-all ${
                    checked ? "text-slate-100" : "text-gray-200"
                }`}
            ></i>
        </button>
    );
}
