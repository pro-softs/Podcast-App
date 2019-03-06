import fetch from "cross-fetch";
export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const RECEIVE_LOGIN = "RECEIVE_LOGIN";
export const ERROR_LOGIN = "ERROR_LOGIN";
export const BASE_URL = "localhost:8080";

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  };
}

function errorLogin(msg) {
  console.log(msg);
  return {
    type: ERROR_LOGIN,
    msg: msg
  };
}

function receiveLogin(json) {
  return {
    type: RECEIVE_LOGIN,
    user: json,
    receivedAt: Date.now()
  };
}

export function fetchLogin(username, psswrd) {
  return dispatch => {
    dispatch(requestLogin());
    return fetch(BASE_URL + psswrd + "&USER_ID="
      + username)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if (response.Message) {
          var msg = response.Message;
          dispatch(errorLogin(msg));
        } else {
          dispatch(receiveLogin(response.UserDetails));
        }
      })
      .catch(function (error) {
        console.log("err: " + error);
        dispatch(errorLogin("Network Error! Try Again"));
      });
  };
}
