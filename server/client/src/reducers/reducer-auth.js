import { AUTH_USER, AUTH_ERROR,  SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  authenticated: localStorage.getItem("token") || "",
  errorMessage: "",
  email: null,
  firstName: null,
  lastName: null,
  org: null,
  orgName: null,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, 
        authenticated: action.payload.token,
        email: action.payload.user.email,
        firstName: action.payload.user.firstName,
        lastName: action.payload.user.lastName,
        org: action.payload.user.org,
        orgName: action.payload.orgName
      };
    case SIGN_OUT:
        return { ...state, 
          authenticated: "", 
          email: null, 
          firstName: null, 
          lastName: null, 
          org: null,
          orgName: null,
        };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;