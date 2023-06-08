import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../features/userAuthSlice";
import getBreweriesReducer from "../features/getBreweriesSlice";
import getBreweryByBreweryIdReducer from "../features/getBreweryByBreweryIdSlice";
import deleteBreweryReducer from "../features/deleteBrewerySlice";
import updateReviewReducer from "../features/updateReviewSlice";
import addReviewReducer from "../features/addReviewSlice";
import updateBreweryReducer from "../features//updateBrewerySlice";
import deleteReviewReducer from "../features/deleteReviewSlice";
import reviewsByBreweryIdReducer from "../features/getReviewsByBreweryIdSlice";

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    getBreweries: getBreweriesReducer,
    deleteBrewery: deleteBreweryReducer,
    updateBrewery: updateBreweryReducer,
    breweryById: getBreweryByBreweryIdReducer,
    addReview: addReviewReducer,
    deleteReview: deleteReviewReducer,
    updateReview: updateReviewReducer,
    reviewsByBreweryId: reviewsByBreweryIdReducer,
  },
  devTools: true,
});
