import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeerMugEmpty } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const UnauthNavBar = () => {
  return (
    <nav className="navbar navbar-light fixed-top">
      <div className="p-2">
        <Link to="/" className="text-decoration-none">
          <span className="navbar-brand text-light">
            <FontAwesomeIcon
              className="text-light ms-4 me-2"
              icon={faBeerMugEmpty}
              size="xl"
            />
            Pint Pursuit
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default UnauthNavBar;
