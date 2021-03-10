import { CHANGE_URL_FIELD, CHANGE_IMAGE_URL, CHANGE_USER, CHANGE_BOXES, CHANGE_ROUTE, CHANGE_IS_SIGNED_IN, ROUTES,
CHANGE_BOXES_PENDING,
CHANGE_BOXES_SUCCESS,
CHANGE_BOXES_FAILURE } from "./constants.js";

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: ROUTES.signIn,
  isSignedIn: false,
  user: {
    id: 0,
    name: "",
    email: "",
    joined: "",
    entries: 0,
  },
}

export const appReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case CHANGE_URL_FIELD:
            return {...state, urlField: action.payload};
        case CHANGE_IMAGE_URL:
            return {...state, imageUrl: action.payload};
        case CHANGE_USER:
            return {...state, user: action.payload};
        case CHANGE_BOXES:
            return {...state, boxes: action.payload};
        case CHANGE_ROUTE:
            return {...state, route: action.payload};
        case CHANGE_IS_SIGNED_IN:
            return {...state, isSignedIn: action.payload};
        default:
            return state;
    }
}

const initialStateBoxes = {
    isPending: false,
    boxes: [],
    error: ''
}
export const boxesReducer = (state = initialStateBoxes, action = {}) => {
    switch(action.type) {
        case CHANGE_BOXES_PENDING:
            return {...state, isPending: true};
        case CHANGE_BOXES_SUCCESS:
            return {...state, boxes: action.payload, isPending: false};
        case CHANGE_BOXES_FAILURE:
            return {...state, error: action.payload, isPending: false};
        default:
            return state;
    }
}