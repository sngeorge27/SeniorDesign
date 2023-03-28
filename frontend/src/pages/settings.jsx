import HeadMetadata from "../components/HeadMetadata";
import Header from "../components/Header";

export default function Settings() {
    return (
        <div className="w-full h-full">
            <HeadMetadata title="Settings" />
            <Header title="Settings"></Header>
            <div className="p-4">
                <p>Settings</p>
            </div>
        </div>
    );
}
