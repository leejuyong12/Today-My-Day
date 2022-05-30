export const initialState = {
  wordGetLoading: false,
  wordGetDone: false,
  wordGetError: null,
  wordGet: null,
}

export const WORD_GET_REQUEST = 'WORD_GET_REQUEST'
export const WORD_GET_SUCCESS = 'WORD_GET_SUCCESS'
export const WORD_GET_FAILURE = 'WORD_GET_FAILURE'

export const wordGetRequestAction = (data) => {
  return {
    type: WORD_GET_REQUEST,
    data,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WORD_GET_REQUEST:
      return {
        ...state,
        wordGetLoading: true,
        wordGetError: null,
        wordGetDone: false,
      }
    case WORD_GET_SUCCESS:
      return {
        ...state,
        wordGetLoading: false,
        wordGetDone: true,
        wordGet: action.data,
      }
    case WORD_GET_FAILURE:
      return {
        ...state,
        wordGetLoading: false,
        wordGetError: action.error,
      }
    default:
      return state
  }
}

export default reducer
