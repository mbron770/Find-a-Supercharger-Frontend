import { useRouteError } from "react-router";
import { Link } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    console.log(error);
    return (
        <div>
            <h1>Something went wrong.</h1>
            <p><code>{error.status}: {error.statusText}</code></p>
            <Link href="/">🔙 go back home</Link>
        </div>
    )
}