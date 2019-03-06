import { combineReducers } from "redux";
import { REQUEST_LOGIN, RECEIVE_LOGIN, ERROR_LOGIN } from "../actions/login";

function login(
  state = {
    isFetching: false,
    isLoggedIn: false,
    isError: false,
    user: {},
    msg: ""
  },
  action
) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        isError: false,
        isLoggedIn: false
      });
    case RECEIVE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        isError: false,
        isLoggedIn: true,
        user: action.user
      });
    case ERROR_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        isError: true,
        isLoggedIn: false,
        msg: action.msg
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  login
});

export default rootReducer;
