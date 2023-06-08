import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
// import Map from "../containers/Map";
import SearchNavBar from "../components/AuthNavBar";
import Pagination from "../components/Pagination";
import StarRatings from "../components/StarRatings";
import { fetchBreweries } from "../features/getBreweriesSlice";
import { deleteBrewery } from "../features/deleteBrewerySlice";
import { updateBrewery } from "../features/updateBrewerySlice";
import { calculateAverageRating } from "../common/utils/calculateAverageRating";
import { formatPhoneNumber } from "../common/utils/formatPhoneNumbers.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhoneVolume,
  faArrowUpRightFromSquare,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";

const Admin = () => {
  const breweryList = useSelector((state) => state.getBreweries.breweries);
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [deletedBreweryId, setDeletedBreweryId] = useState(null);
  const [updatedBreweryId, setUpdatedBreweryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [updatedCity, setUpdatedCity] = useState("");
  const [updatedState, setUpdatedState] = useState("");
  const [updatedZipCode, setUpdatedZipCode] = useState("");
  const [updatedCountry, setUpdatedCountry] = useState("");
  const [updatedLongitude, setUpdatedLongitude] = useState("");
  const [updatedLatitude, setUpdatedLatitude] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedWebsiteURL, setUpdatedWebsiteURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const LIMIT = 10;

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchBreweries(name, city, state))
      .then((response) => {
        if (response.error) {
          alert(response.error.message);
        } else {
          setName("");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deletedBreweryId, dispatch, updatedName, updatedCity, updatedState]);

  useEffect(() => {
    if (breweryList) {
      setTotalPages(Math.ceil(breweryList.length / LIMIT));
    }
  }, [breweryList]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    dispatch(fetchBreweries({ name, city, state })).then((response) => {
      if (response.error) {
        alert(response.error.message);
      } else {
        setName("");
        setIsLoading(false);
      }
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleDelete = (breweryId) => {
    setIsLoading(true);
    dispatch(deleteBrewery({ breweryId }))
      .then(() => {
        setDeletedBreweryId(breweryId);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateReviewSubmit = (e, breweryId) => {
    e.preventDefault();
    dispatch(
      updateBrewery({
        breweryId,
        name: updatedName,
        address: updatedAddress,
        city: updatedCity,
        state: updatedState,
        zipCode: updatedZipCode,
        country: updatedCountry,
        longitude: updatedLongitude,
        latitude: updatedLatitude,
        phone: updatedPhone,
        websiteUrl: updatedWebsiteURL,
      })
    )
      .then(() => {
        setUpdatedBreweryId(breweryId);
      })
      .catch((err) => {
        console.log(err);
      });
    setUpdatedName("");
    setUpdatedAddress("");
    setUpdatedCity("");
    setUpdatedState("");
    setUpdatedZipCode("");
    setUpdatedCountry("");
    setUpdatedLongitude("");
    setUpdatedLatitude("");
    setUpdatedPhone("");
    setUpdatedWebsiteURL("");
  };

  const handleHomeButtonClick = () => {
    dispatch(fetchBreweries({ name: null, city: null, state: null }));
  };

  const startIndex = (currentPage - 1) * LIMIT;
  const endIndex = currentPage * LIMIT;
  const paginatedBreweries = breweryList.slice(startIndex, endIndex);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="home-page">
      {userIsLoggedIn ? (
        <SearchNavBar onHomeButtonClick={handleHomeButtonClick} />
      ) : (
        <Login />
      )}
      <div className="container mb-2">
        <div className="row">
          <h2 className="text-center mt-4 mb-4 title-color">
            Search Breweries...
          </h2>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form onSubmit={handleSearchSubmit}>
              <div className="input-group mt-2 mb-2">
                <input
                  type="search"
                  placeholder="Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <button className="nav-button btn btn-primary" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="col-12 text-center mb-5 mt-2">
            <Link className="btn btn-primary " to="/add-brewery">
              Add Brewery
            </Link>
          </div>
        </div>
        {breweryList.length === 0 ? (
          <div></div>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        )}
        <div className="row">
          {paginatedBreweries &&
            paginatedBreweries.map((brewery) => {
              const averageRating = calculateAverageRating(brewery.reviews);
              return (
                <div className="col-12 pt-2 pb-2" key={brewery._id}>
                  <div
                    className="bg-white border shadow rounded d-flex p-5 flex-column h-100"
                    style={{ justifyContent: "space-evenly" }}
                  >
                    <div className="row">
                      <div className="col-12">
                        <h3 className="text-center mb-4">{brewery.name}</h3>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6 text-end">
                        <button
                          className="btn btn-primary"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#update-brewery-modal"
                        >
                          Update
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          onClick={() => handleDelete(brewery._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-lg-6">
                        <div className="text-left mb-1">
                          <FontAwesomeIcon
                            className="text-primary me-2"
                            icon={faLocationDot}
                            size="lg"
                          />
                          {brewery.address}
                          <p className="ms-4">
                            {brewery.city}, {brewery.state}{" "}
                            {brewery.zipCode.slice(0, 5)}
                          </p>
                        </div>
                        <div className="text-left mb-1">
                          <p>
                            <FontAwesomeIcon
                              icon={faPhoneVolume}
                              className="text-danger me-2"
                              size="lg"
                            />
                            {formatPhoneNumber(brewery.phone)}
                          </p>
                        </div>
                        <div className="text-left mb-3">
                          <a
                            href={brewery.websiteUrl}
                            className="text-dark text-decoration-none"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon
                              icon={faArrowUpRightFromSquare}
                              className="text-success me-2"
                              size="lg"
                            />
                            Website
                          </a>
                        </div>
                        <div className="text-left mb-3">
                          <Link
                            to={`/reviews/${brewery._id}`}
                            target="_blank"
                            className="text-start text-dark text-decoration-none"
                          >
                            <div className="text-left mb-3">
                              <FontAwesomeIcon
                                icon={faComment}
                                className="text-dark me-2"
                                size="lg"
                              />
                              {brewery.reviews.length} Reviews
                            </div>
                            <div className="text-left mb-3">
                              <StarRatings rating={averageRating} />
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className="col-xs-12 col-lg-6">
                        {/* <Map
                          latitude={brewery.latitude}
                          longitude={brewery.longitude}
                        /> */}
                      </div>
                      <div
                        className="modal fade"
                        id="update-brewery-modal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="modal-title"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="modal-title">
                                Update Brewery
                              </h5>
                              <button
                                type="submit"
                                className="close btn"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body text-center">
                              <form
                                onSubmit={(e) =>
                                  handleUpdateReviewSubmit(e, brewery._id)
                                }
                              >
                                <div className="row">
                                  <div className="form-group col ms-3 me-3 mt-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Name"
                                      value={updatedName}
                                      onChange={(e) =>
                                        setUpdatedName(e.target.value)
                                      }
                                      required
                                    ></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col ms-3 me-3 mt-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Address"
                                      value={updatedAddress}
                                      onChange={(e) =>
                                        setUpdatedAddress(e.target.value)
                                      }
                                      required
                                    ></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col ms-3 me-3 mt-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="City"
                                      value={updatedCity}
                                      onChange={(e) =>
                                        setUpdatedCity(e.target.value)
                                      }
                                      required
                                    ></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col ms-3 me-3 mt-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="State"
                                      value={updatedState}
                                      onChange={(e) =>
                                        setUpdatedState(e.target.value)
                                      }
                                      required
                                    ></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col ms-3 me-3 mt-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Zip Code"
                                      value={updatedZipCode}
                                      onChange={(e) =>
                                        setUpdatedZipCode(e.target.value)
                                      }
                                      required
                                    ></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col ms-3 me-3 mt-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Country"
                                      value={updatedCountry}
                                      onChange={(e) =>
                                        setUpdatedCountry(e.target.value)
                                      }
                                      required
                                    ></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col ms-3 me-3 mt-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Longitude"
                                      value={updatedLongitude}
                                      onChange={(e) =>
                                        setUpdatedLongitude(e.target.value)
                                      }
                                      required
                                    ></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col ms-3 me-3 mt-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Latitude"
                                      value={updatedLatitude}
                                      onChange={(e) =>
                                        setUpdatedLatitude(e.target.value)
                                      }
                                      required
                                    ></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col ms-3 me-3 mt-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Phone Number"
                                      value={updatedPhone}
                                      onChange={(e) =>
                                        setUpdatedPhone(e.target.value)
                                      }
                                      required
                                    ></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="form-group col ms-3 me-3 mt-3">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Website URL"
                                      value={updatedWebsiteURL}
                                      onChange={(e) =>
                                        setUpdatedWebsiteURL(e.target.value)
                                      }
                                      required
                                    ></input>
                                  </div>
                                </div>
                                {updatedName &&
                                updatedAddress &&
                                updatedCity &&
                                updatedState &&
                                updatedZipCode &&
                                updatedCountry &&
                                updatedLongitude &&
                                updatedLatitude &&
                                updatedPhone &&
                                updatedWebsiteURL ? (
                                  <button
                                    type="submit"
                                    className="btn btn-primary mt-4"
                                    data-bs-dismiss="modal"
                                  >
                                    Update
                                  </button>
                                ) : (
                                  <button
                                    type="submit"
                                    className="btn btn-primary mt-2"
                                  >
                                    Update
                                  </button>
                                )}
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {breweryList.length === 0 ? (
          <div></div>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
