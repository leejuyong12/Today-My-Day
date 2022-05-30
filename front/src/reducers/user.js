export const initialState = {
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  me: null,
  signUpData: {},
  loginData: {},
}

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const loadUserRequestAction = (data) => {
  return {
    type: LOAD_USER_REQUEST,
    data,
  }
}

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
}

export const logoutRequestAction = (data) => {
  return {
    type: LOG_OUT_REQUEST,
    data,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loadUserLoading: true,
        loadUserError: null,
        loadUserDone: false,
      }
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loadUserLoading: false,
        loadUserDone: true,
        me: action.data,
      }
    case LOAD_USER_FAILURE:
      return {
        ...state,
        loadUserLoading: false,
        loadUserError: action.error,
      }
    case LOG_IN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginError: null,
        loginDone: false,
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        me: action.data,
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      }
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
        logoutDone: false,
        logoutError: null,
      }
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        logoutDone: true,
        me: null,
      }
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.error,
      }
    default:
      return state
  }
}

export default reducer
