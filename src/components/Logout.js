import { useDispatch } from "react-redux";
import { logout } from "../features/userAuthSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="logout">
      <button className="btn btn-danger" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
