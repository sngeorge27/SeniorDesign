import { useRouteError } from "react-router-dom";
import HeadMetadata from "../components/HeadMetadata";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <div className="flex flex-col items-center justify-center w-full h-[100dvh] ">
            <HeadMetadata title="Error" />
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
