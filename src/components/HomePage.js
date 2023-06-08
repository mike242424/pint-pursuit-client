import { useSelector } from "react-redux";
import Login from "../containers/Login";
import BreweryView from "../containers/BreweriesView";

const HomePage = () => {
  const { isLoggedIn } = useSelector((state) => state.userAuth);

  return isLoggedIn ? <BreweryView /> : <Login />;
};

export default HomePage;
