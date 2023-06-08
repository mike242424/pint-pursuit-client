import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeerMugEmpty } from "@fortawesome/free-solid-svg-icons";
import Logout from "./Logout";

const AuthNavBar = ({ onHomeButtonClick }) => {
  return (
    <nav className="navbar navbar-light fixed-top">
      <div className="p-2">
        <Link
          to="/homepage"
          className="text-decoration-none"
          onClick={onHomeButtonClick}
        >
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
      <div className="p-1 me-4">
        <Logout />
      </div>
    </nav>
  );
};

export default AuthNavBar;
