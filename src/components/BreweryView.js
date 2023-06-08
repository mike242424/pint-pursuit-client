import { Link } from "react-router-dom";
import { calculateAverageRating } from "../common/utils/calculateAverageRating";
import { formatPhoneNumber } from "../common/utils/formatPhoneNumbers.js.js";
import StarRatings from "./StarRatings";
import Map from "../containers/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhoneVolume,
  faArrowUpRightFromSquare,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

const BreweryView = ({ brewery }) => {
  return (
    <div className="col-12 pt-2 pb-2">
      <div
        className="bg-white border shadow rounded d-flex p-5 flex-column h-100"
        style={{ justifyContent: "space-evenly" }}
      >
        <h3 className="text-center mb-4">{brewery.name}</h3>
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
                {brewery.city}, {brewery.state} {brewery.zipCode.slice(0, 5)}
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
                <div className="text-left">
                  <StarRatings
                    rating={calculateAverageRating(brewery.reviews)}
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="col-xs-12 col-lg-6">
            <Map latitude={brewery.latitude} longitude={brewery.longitude} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreweryView;
