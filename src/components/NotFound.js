import UnauthNavBar from "./UnauthNavBar";

const NotFound = () => {
  return (
    <div className="not-found">
      <UnauthNavBar />
      <div className="container text-center">
        <h2 className="mt-4">404 Error: Page Not Found</h2>
        <p>The page you are looking for does not exist</p>
      </div>
    </div>
  );
};

export default NotFound;
