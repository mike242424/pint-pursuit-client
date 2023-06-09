import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AuthNavBar from "../components/AuthNavBar";
import StarRatings from "../components/StarRatings";
import Loading from "../components/Loading";
import { fetchBreweryByBreweryId } from "../features/getBreweryByBreweryIdSlice";
import { addReview } from "../features/addReviewSlice";
import { updateReview } from "../features/updateReviewSlice";
import { deleteReview } from "../features/deleteReviewSlice";
import { formatDate } from "../common/utils/formatDate";
import { fetchBreweries } from "../features/getBreweriesSlice";

const Reviews = () => {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [updatedRating, setUpdatedRating] = useState("");
  const [updatedReview, setUpdatedReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const breweryById = useSelector((state) => state.breweryById);
  const addedReviews = useSelector((state) => state.addReview);
  const deletedReviews = useSelector((state) => state.deleteReview);
  const updatedReviews = useSelector((state) => state.updatedReview);

  const { _id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchBreweryByBreweryId(_id)).then((response) => {
      if (response.error) {
        alert(response.error.message);
      } else {
        setIsLoading(false);
      }
    });
  }, [dispatch, _id, addedReviews, deletedReviews, updatedReviews]);

  const handleAddReviewSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    dispatch(
      addReview({
        breweryId: breweryById.breweries.brewery._id,
        rating,
        review,
      })
    )
      .then((response) => {
        if (response.error) {
          alert(response.error.message);
        } else {
          setRating("");
          setReview("");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateReviewSubmit = (e, reviewId) => {
    e.preventDefault();
    setIsLoading(true);

    dispatch(
      updateReview({
        ratingId: reviewId,
        rating: updatedRating,
        review: updatedReview,
      })
    )
      .then((response) => {
        if (response.error) {
          alert("You cannot update this review");
        } else {
          setUpdatedRating("");
          setUpdatedReview("");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (reviewId) => {
    setIsLoading(true);

    dispatch(deleteReview({ ratingId: reviewId }))
      .then((response) => {
        if (response.error) {
          alert("You cannot delete this review");
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHomeButtonClick = () => {
    setIsLoading(true);
    dispatch(fetchBreweries({ name: null, city: null, state: null })).then(
      (response) => {
        if (response.error) {
          alert(response.error.message);
        } else {
          setIsLoading(false);
        }
      }
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  const brewery = breweryById.breweries?.brewery;

  return (
    <div className="brewery">
      <AuthNavBar onHomeButtonClick={handleHomeButtonClick} />
      <div className="container">
        {brewery && (
          <div className="row">
            <div className="col-3  mt-4 mb-2">
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#new-reviews-modal"
              >
                Add Review
              </button>
            </div>
            <div className="col-6  mt-4 mb-2">
              <h2 className="text-center  title-color">
                {breweryById.breweries.brewery.name}
              </h2>
            </div>
          </div>
        )}
        {breweryById.breweries &&
          breweryById.breweries.brewery &&
          breweryById.breweries.brewery.reviews &&
          breweryById.breweries.brewery.reviews.map((review) => {
            return (
              <div className="col-12" key={review._id}>
                <div className="card shadow p-4 mt-3 mb-3">
                  <div className="row">
                    <h4 className="col-8">{review.createdBy}</h4>
                    <span className="col-4 text-end">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <p>Review: {review.review}</p>
                  <div className="row">
                    <div className="col-6">
                      <StarRatings rating={review.rating} />
                    </div>
                    <div className="col-6 text-end">
                      <button
                        className="btn btn-success me-1"
                        data-bs-toggle="modal"
                        data-bs-target="#update-reviews-modal"
                        onClick={(e) => {
                          setUpdatedRating(e.target.value);
                          setUpdatedReview(e.target.value);
                        }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade"
                  id="update-reviews-modal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="modal-title"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="modal-title">
                          Update Review
                        </h5>
                        <button
                          type="button"
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
                            handleUpdateReviewSubmit(e, review._id)
                          }
                        >
                          <div className="row">
                            <div className="form-group col ms-3 me-3 mt-3">
                              <input
                                className="form-control"
                                type="number"
                                min="0"
                                max="5"
                                placeholder="Rating"
                                value={updatedRating}
                                onChange={(e) =>
                                  setUpdatedRating(e.target.value)
                                }
                                required
                              ></input>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col m-3">
                              <textarea
                                className="form-control"
                                placeholder="Review"
                                rows="10"
                                value={updatedReview}
                                onChange={(e) =>
                                  setUpdatedReview(e.target.value)
                                }
                                required
                              ></textarea>
                            </div>
                          </div>
                          {updatedReview && updatedRating ? (
                            <button
                              type="submit"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                            >
                              Update
                            </button>
                          ) : (
                            <button type="submit" className="btn btn-primary">
                              Update
                            </button>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div
        className="modal fade"
        id="new-reviews-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modal-title">
                Add Review
              </h5>
              <button
                type="button"
                className="close btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <form onSubmit={handleAddReviewSubmit}>
                <div className="row">
                  <div className="form-group col ms-3 me-3 mt-3">
                    <input
                      className="form-control"
                      type="number"
                      min="0"
                      max="5"
                      placeholder="Rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col m-3">
                    <textarea
                      className="form-control"
                      placeholder="Review"
                      rows="10"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                {rating && review ? (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Add
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
