import { CHANGE_URL_FIELD, CHANGE_IMAGE_URL, CHANGE_USER, CHANGE_BOXES, CHANGE_ROUTE, CHANGE_IS_SIGNED_IN } from "./constants.js";

export const setUrlField = (input) => ({
  type: CHANGE_URL_FIELD,
  payload: input,
});

export const setImageUrl = (imageUrl) => ({
  type: CHANGE_IMAGE_URL,
  payload: imageUrl,
});

export const setUser = (user) => ({
  type: CHANGE_USER,
  payload: user,
});

export const setBoxes = (boxes) => ({
  type: CHANGE_BOXES,
  payload: boxes,
});

export const setRoute = (route) => ({
  type: CHANGE_ROUTE,
  payload: route,
});

export const setIsSignedIn = (isSignedIn) => ({
  type: CHANGE_IS_SIGNED_IN,
  payload: isSignedIn,
});
