import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import SearchNavBar from "../components/AuthNavBar";
import { addBrewery } from "../features/addBrewerySlice";
import Loading from "../components/Loading";

const CreateBrewery = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      addBrewery({
        name,
        address,
        city,
        state,
        zipCode,
        country,
        longitude,
        latitude,
        phone: phoneNumber,
        websiteUrl,
      })
    )
      .then((response) => {
        if (response.error) {
          alert(response.error.message);
        } else {
          setName("");
          setAddress("");
          setCity("");
          setState("");
          setZipCode("");
          setCountry("");
          setLongitude("");
          setLatitude("");
          setPhoneNumber("");
          setWebsiteUrl("");
          setIsLoading(false);
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="create-brewery container text-center">
      {userIsLoggedIn ? <SearchNavBar /> : <Login />}
      <div className="row">
        <h2 className="text-center mt-4 mb-4 title-color">Add A Brewery</h2>
        <div className="col-md-8 offset-md-2">
          <form onSubmit={handleNameSubmit}>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Address"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="City"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="State"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Zip Code"
                className="form-control"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Country"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Longitude"
                className="form-control"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Latitude"
                className="form-control"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Phone Number"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Website URL"
                className="form-control"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                required
              ></input>
            </div>
            <div className="row">
              <div className="col-6 mb-4 mt-2 text-start">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
              <div className="col-6 mb-4 mt-2 text-end">
                <Link className="btn btn-danger" to="/admin">
                  Back
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBrewery;
