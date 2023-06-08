import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./containers/Login";
import NotFound from "./components/NotFound";
import Reviews from "./containers/Reviews";
import HomePage from "./containers/BreweriesView";
import CreateBrewery from "./containers/CreateBrewery";
import Admin from "./containers/Admin";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add-brewery" element={<CreateBrewery />} />
        <Route path="/reviews/:_id" element={<Reviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
