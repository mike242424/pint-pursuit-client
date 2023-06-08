import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Login from "./Login";
import SearchNavBar from "../components/AuthNavBar";
import { addBrewery } from "../features/addBrewerySlice";

const CreateBrewery = () => {
  const [breweryName, setBreweryName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);

  const dispatch = useDispatch();

  const handleNameSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addBrewery({
        name: breweryName,
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
          setBreweryName("");
          setAddress("");
          setCity("");
          setState("");
          setZipCode("");
          setCountry("");
          setLongitude("");
          setLatitude("");
          setPhoneNumber("");
          setWebsiteUrl("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNameInputChange = (e) => {
    setBreweryName(e.target.value);
  };

  const handleAddressInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateInputChange = (e) => {
    setState(e.target.value);
  };

  const handleZipCodeInputChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleCountryInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleLongitudeInputChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleLatitudeInputChange = (e) => {
    setLatitude(e.target.value);
  };

  const handlePhoneNumberInputChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleWebsiteUrlInputChange = (e) => {
    setWebsiteUrl(e.target.value);
  };

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
                value={breweryName}
                onChange={handleNameInputChange}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Address"
                className="form-control"
                value={address}
                onChange={handleAddressInputChange}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="City"
                className="form-control"
                value={city}
                onChange={handleCityInputChange}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="State"
                className="form-control"
                value={state}
                onChange={handleStateInputChange}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Zip Code"
                className="form-control"
                value={zipCode}
                onChange={handleZipCodeInputChange}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Country"
                className="form-control"
                value={country}
                onChange={handleCountryInputChange}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Longitude"
                className="form-control"
                value={longitude}
                onChange={handleLongitudeInputChange}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Latitude"
                className="form-control"
                value={latitude}
                onChange={handleLatitudeInputChange}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Phone Number"
                className="form-control"
                value={phoneNumber}
                onChange={handlePhoneNumberInputChange}
                required
              ></input>
            </div>
            <div className="input-group mt-2 mb-2">
              <input
                type="text"
                placeholder="Website URL"
                className="form-control"
                value={websiteUrl}
                onChange={handleWebsiteUrlInputChange}
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
