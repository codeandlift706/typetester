import { useRouteError } from 'react-router-dom';

export default function Error() {
    const { error } = useRouteError();
    return (
        <div className="error">
        <h1>Oops!</h1>
        <p>Something went wrong.</p>
        </div>
    );
    }

