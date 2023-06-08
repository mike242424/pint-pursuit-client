import { useEffect, useState } from "react";
import AuthNavBar from "../components/AuthNavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchBreweries } from "../features/getBreweriesSlice";
import Pagination from "../components/Pagination";
import BreweryPreview from "../components/BreweryView";
import Loading from "../components/Loading";

const BreweriesView = () => {
  const breweryList = useSelector((state) => state.getBreweries.breweries);
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const LIMIT = 10;

  useEffect(() => {
    if (breweryList) {
      setTotalPages(Math.ceil(breweryList.length / LIMIT));
    }
  }, [breweryList]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    dispatch(fetchBreweries({ name, city, state }));

    setName("");
    setState("");
    setCity("");
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleHomeButtonClick = () => {
    dispatch(fetchBreweries({ name: null, city: null, state: null }));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * LIMIT;
  const endIndex = currentPage * LIMIT;
  const paginatedBreweries = breweryList.slice(startIndex, endIndex);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="home-page">
      <AuthNavBar onHomeButtonClick={handleHomeButtonClick} />
      <div className="container mb-2">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mt-4 mb-4 title-color">
              Search Breweries By...
            </h2>
          </div>
        </div>
        <div className="row text-center">
          <form onSubmit={handleSearchSubmit}>
            <div className="input-group mt-2 mb-2">
              <div className="col-12 col-md-4">
                <input
                  type="search"
                  placeholder="Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4">
                <input
                  type="search"
                  placeholder="City"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4">
                <input
                  type="search"
                  placeholder="State"
                  className="form-control"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
            <div className="text-center">
              <button className="btn btn-primary mt-2 mb-5" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
        {breweryList.length === 0 ? (
          <></>
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
            paginatedBreweries.map((brewery) => (
              <BreweryPreview key={brewery._id} brewery={brewery} />
            ))}
        </div>
        {breweryList.length === 0 ? (
          <></>
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

export default BreweriesView;
