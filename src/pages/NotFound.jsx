import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();

  return (
    <div
      id="error-page"
      className="mx-auto max-w-5xl text-center space-y-3 my-6"
    >
      <h1 className="text-7xl font-bold">Oops!</h1>
      <p className="text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="text-md mb-6">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/home" className="btn btn-error">
        Back Home
      </Link>
    </div>
  );
}
