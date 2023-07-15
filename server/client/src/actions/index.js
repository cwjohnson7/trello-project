import axios from "axios";
import { AUTH_USER, AUTH_ERROR, SIGN_OUT } from "./types";
const base_URL = 'https://trello-jr.onrender.com';
export const signup = (formProps, callback) => dispatch => {
  axios.post(
    // localhost will need to change
    base_URL +"/api/signup",
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem("token", response.data.token);
    callback();
  })
  .catch(function(error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  });
};

export const signin = (formProps, callback) => dispatch => {
  axios.post(
    base_URL + "/api/signin",
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem("token", response.data.token);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  });
};

export const fetchUser = () => dispatch => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    }
  };

  axios
    .get(base_URL + "/api/current_user", config)
    .then(function (response) {
      dispatch({ type: AUTH_USER, payload: response.data });
      localStorage.setItem("token", response.data.token);
  })
    .catch(function(error) {
      console.log(error);
    });
};

export const signout = (callback) => dispatch => {
  localStorage.removeItem("token");

  dispatch({ type: SIGN_OUT });
  callback();
};