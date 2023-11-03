import { useRouteError } from 'react-router-dom';

export default function Error() {
    const { error } = useRouteError();
    return (
        <div>
        <h1>Oops!</h1>
        <p>Something went wrong:</p>
        <pre>{error.stack}</pre>
        </div>
    );
    }