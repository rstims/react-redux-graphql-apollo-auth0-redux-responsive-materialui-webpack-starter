import moment from 'moment';
const dateFormat = 'DD/MM/YYYY HH:mm';

/* -----------------------------------------
  constants
 ------------------------------------------*/
// non profile views:
const ENTER_HOME_VIEW  = 'ENTER_HOME_VIEW';
const LEAVE_HOME_VIEW  = 'LEAVE_HOME_VIEW';
const ENTER_ABOUT_VIEW = 'ENTER_ABOUT_VIEW';
const LEAVE_ABOUT_VIEW = 'LEAVE_ABOUT_VIEW';
const ENTER_LOGIN_VIEW = 'ENTER_LOGIN_VIEW';
const LEAVE_LOGIN_VIEW = 'LEAVE_LOGIN_VIEW';
const ENTER_REGISTER_VIEW = 'ENTER_REGISTER_VIEW';
const LEAVE_REGISTER_VIEW = 'LEAVE_REGISTER_VIEW';
const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
// profile views:
const ENTER_PROFILE_VIEW = 'ENTER_PRofile_VIEW';
const LEAVE_PROFILE_VIEW = 'LEAVE_PRofile_VIEW';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  currentView:  'not set',
  enterTime:    null,
  leaveTime:    null,
  isDrawerOpen: false,
};

export default function (state = initialState, action) {
  const currentTime = moment().format(dateFormat);

  switch (action.type) {
  // /////////////////////
  // non profile views:
  // /////////////////////
  case ENTER_HOME_VIEW:
  case ENTER_ABOUT_VIEW:
  case ENTER_LOGIN_VIEW:
  case ENTER_REGISTER_VIEW:
    // can't enter if you are already inside
    if (state.currentView !== action.currentView) {
      return {
        ...state,
        currentView: action.currentView,
        enterTime: currentTime
      };
    }
    return state;
  case LEAVE_HOME_VIEW:
  case LEAVE_ABOUT_VIEW:
  case LEAVE_LOGIN_VIEW:
  case LEAVE_REGISTER_VIEW:
    // can't leave if you aren't already inside
    if (state.currentView === action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        leaveTime:    currentTime,
        isDrawerOpen: false,

      };
    }
    return state;
  case TOGGLE_DRAWER:
    return {
      ...state,
      isDrawerOpen: !action.isDrawerOpen
    }
  // /////////////////////
  // profile views:
  // /////////////////////
  case ENTER_PROFILE_VIEW:
    if (state.currentView !== action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    currentTime
      };
    }
    return state;
  case LEAVE_PROFILE_VIEW:
    if (state.currentView === action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        leaveTime:    currentTime,
        isDrawerOpen: false,
      };
    }
    return state;

  default:
    return state;
  }
}


/* -----------------------------------------
  Reducer
 ------------------------------------------*/
export function enterHome() {
  return {
    type:         ENTER_HOME_VIEW,
    currentView:  'home'
  };
}
export function leaveHome() {
  return {
    type:         LEAVE_HOME_VIEW,
    currentView:  'home'
  };
}

export function enterAbout() {
  return {
    type:         ENTER_ABOUT_VIEW,
    currentView:  'about'
  };
}
export function leaveAbout() {
  return {
    type:         LEAVE_ABOUT_VIEW,
    currentView:  'about'
  };
}

export function enterLogin() {
  return {
    type:         ENTER_LOGIN_VIEW,
    currentView:  'login'
  };
}
export function leaveLogin() {
  return {
    type:         LEAVE_LOGIN_VIEW,
    currentView:  'login'
  };
}

export function enterRegister() {
  return {
    type:         ENTER_REGISTER_VIEW,
    currentView:  'register'
  };
}
export function leaveRegister() {
  return {
    type:         LEAVE_REGISTER_VIEW,
    currentView:  'register'
  };
}

export function enterProfile() {
  return {
    type:         ENTER_PROFILE_VIEW,
    currentView:  'profile'
  };
}
export function leaveProfile() {
  return {
    type:         LEAVE_PROFILE_VIEW,
    currentView:  'profile'
  };
}
export const toggleDrawer = isDrawerOpen => (
  {
      type:         TOGGLE_DRAWER,
      isDrawerOpen
  }
)
