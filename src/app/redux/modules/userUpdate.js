import moment from 'moment';
import { auth } from '../../services/auth';
const dateFormat = 'DD/MM/YYYY HH:mm';

/* -----------------------------------------
  constants
 ------------------------------------------*/
const CHECK_IS_USER_IS_AUTHENTICATED = 'CHECK_IS_USER_IS_AUTHENTICATED';

const RECEIVED_USER_UPDATE  = 'RECEIVED_USER_UPDATE';
const ERROR_USER_UPDATE = 'ERROR_USER_UPDATE';

const SET_LOADING_UPDATE = 'SET_LOADING_UPDATE';
const UNSET_LOADING_UPDATE = 'UNSET_LOADING_UPDATE';

const RESET_UPDATE_ERRORS = 'RESET_UPDATE_ERRORS';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const user = auth.getUserInfo();

const initialState = {
  lastActionTime: null,
  mutationLoading: false,
  errors: null,
  ...user
};

export default function (state = initialState, action) {

  switch (action.type) {

  case RECEIVED_USER_UPDATE:
    return {
      ...state,
      lastActionTime: action.time,
      email: action.user.email,
      username: action.user.username,
      error: null
    };

  case ERROR_USER_UPDATE:
    return {
      ...state,
      lastActionTime: action.time,
      // errors:
      error: {...action.error},
      // user infos:
      ...initialState.user
    };

  case SET_LOADING_UPDATE:
  case UNSET_LOADING_UPDATE:
    return {
      ...state,
      lastActionTime: action.time,
      mutationLoading: action.loading
    };

  case RESET_UPDATE_ERRORS:
    return {
      ...state,
      error: null
    };

  default:
    return state;
  }
}

/* -----------------------------------------
  action creators
 ------------------------------------------*/

// //////////////////
// login sucess:
// //////////////////
export function receivedUserUpdate(userToken = null, user = emptyUser, time = moment().format(dateFormat)) {

  auth.setUserInfo(user);

  return {
    type: RECEIVED_USER_UPDATE,
    time,
    user
  };
}
// //////////////////
// login error:
// //////////////////
export function errorUserUpdate(error = null, time = moment().format(dateFormat)) {
  
  return {
    type: ERROR_USER_UPDATE,
    time,
    error
  };
}
// /////////////////////////////
// set loading state for login
// /////////////////////////////
export function setLoadingStateForUserUpdate(time = moment().format(dateFormat)) {
  return {
    type: SET_LOADING_UPDATE,
    time,
    loading: true
  };
}
// /////////////////////////////
// unset loading state for login
// /////////////////////////////
export function unsetLoadingStateForUserUpdate(time = moment().format(dateFormat)) {
  return {
    type: UNSET_LOADING_UPDATE,
    time,
    loading: false
  };
}


// ////////////////////////////////
// reset ligon and register error:
// ////////////////////////////////
export function resetUpdateError() {
  return {
    type: RESET_UPDATE_ERRORS
  };
}
