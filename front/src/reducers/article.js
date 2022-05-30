export const initialState = {
  articleAddLoading: false,
  articleAddDone: false,
  articleAddError: null,
  articleAdd: null,
  articleListLoading: false,
  articleListDone: false,
  articleListError: null,
  articleList: null,
  diarySearchWordLoading: false,
  diarySearchWordDone: false,
  diarySearchWordError: null,
  diarySearchWord: null,
  MySearchWordLoading: false,
  MySearchWordDone: false,
  MySearchWordError: null,
  MySearchWord: null,
  diarySearchContentLoading: false,
  diarySearchContentDone: false,
  diarySearchContentError: null,
  diarySearchContent: null,
}

export const ARTICLE_ADD_REQUEST = 'ARTICLE_ADD_REQUEST'
export const ARTICLE_ADD_SUCCESS = 'ARTICLE_ADD_SUCCESS'
export const ARTICLE_ADD_FAILURE = 'ARTICLE_ADD_FAILURE'

export const ARTICLE_LIST_REQUEST = 'ARTICLE_LIST_REQUEST'
export const ARTICLE_LIST_SUCCESS = 'ARTICLE_LIST_SUCCESS'
export const ARTICLE_LIST_FAILURE = 'ARTICLE_LIST_FAILURE'

export const DIARY_SEARCH_WORD_REQUEST = 'DIARY_SEARCH_WORD_REQUEST'
export const DIARY_SEARCH_WORD_SUCCESS = 'DIARY_SEARCH_WORD_SUCCESS'
export const DIARY_SEARCH_WORD_FAILURE = 'DIARY_SEARCH_WORD_FAILURE'

export const MY_SEARCH_WORD_REQUEST = 'MY_SEARCH_WORD_REQUEST'
export const MY_SEARCH_WORD_SUCCESS = 'MY_SEARCH_WORD_SUCCESS'
export const MY_SEARCH_WORD_FAILURE = 'MY_SEARCH_WORD_FAILURE'

export const DIARY_SEARCH_CONTENT_REQUEST = 'DIARY_SEARCH_CONTENT_REQUEST'
export const DIARY_SEARCH_CONTENT_SUCCESS = 'DIARY_SEARCH_CONTENT_SUCCESS'
export const DIARY_SEARCH_CONTENT_FAILURE = 'DIARY_SEARCH_CONTENT_FAILURE'

export const articleAddRequestAction = (data) => {
  return {
    type: ARTICLE_ADD_REQUEST,
    data,
  }
}

export const articleListRequestAction = (data) => {
  return {
    type: ARTICLE_LIST_REQUEST,
    data,
  }
}

export const diarySearchWordRequestAction = (data) => {
  return {
    type: DIARY_SEARCH_WORD_REQUEST,
    data,
  }
}

export const mySearchWordRequestAction = (data) => {
  return {
    type: MY_SEARCH_WORD_REQUEST,
    data,
  }
}

export const diarySearchContentRequestAction = (data) => {
  return {
    type: DIARY_SEARCH_CONTENT_REQUEST,
    data,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_ADD_REQUEST:
      return {
        ...state,
        articleAddLoading: true,
        articleAddError: null,
        articleAddDone: false,
      }
    case ARTICLE_ADD_SUCCESS:
      return {
        ...state,
        articleAddLoading: false,
        articleAddDone: true,
        articleAdd: action.data,
      }
    case ARTICLE_ADD_FAILURE:
      return {
        ...state,
        articleAddLoading: false,
        articleAddError: action.error,
      }
    case ARTICLE_LIST_REQUEST:
      return {
        ...state,
        articleListLoading: true,
        articleListError: null,
        articleListDone: false,
      }
    case ARTICLE_LIST_SUCCESS:
      return {
        ...state,
        articleListLoading: false,
        articleListDone: true,
        articleList: action.data,
      }
    case ARTICLE_LIST_FAILURE:
      return {
        ...state,
        articleListLoading: false,
        articleListError: action.error,
      }
    case DIARY_SEARCH_WORD_REQUEST:
      return {
        ...state,
        diarySearchWordLoading: true,
        diarySearchWordError: null,
        diarySearchWordDone: false,
      }
    case DIARY_SEARCH_WORD_SUCCESS:
      return {
        ...state,
        diarySearchWordLoading: false,
        diarySearchWordDone: true,
        diarySearchWord: action.data,
      }
    case DIARY_SEARCH_WORD_FAILURE:
      return {
        ...state,
        diarySearchWordLoading: false,
        diarySearchWordError: action.error,
      }
    case MY_SEARCH_WORD_REQUEST:
      return {
        ...state,
        mySearchWordLoading: true,
        mySearchWordError: null,
        mySearchWordDone: false,
      }
    case MY_SEARCH_WORD_SUCCESS:
      return {
        ...state,
        mySearchWordLoading: false,
        mySearchWordDone: true,
        mySearchWord: action.data,
      }
    case MY_SEARCH_WORD_FAILURE:
      return {
        ...state,
        mySearchWordLoading: false,
        mySearchWordError: action.error,
      }
    case DIARY_SEARCH_CONTENT_REQUEST:
      return {
        ...state,
        diarySearchContentLoading: true,
        diarySearchContentError: null,
        diarySearchContentDone: false,
      }
    case DIARY_SEARCH_CONTENT_SUCCESS:
      return {
        ...state,
        diarySearchContentLoading: false,
        diarySearchContentDone: true,
        diarySearchContent: action.data,
      }
    case DIARY_SEARCH_CONTENT_FAILURE:
      return {
        ...state,
        diarySearchContentLoading: false,
        diarySearchContentError: action.error,
      }
    default:
      return state
  }
}

export default reducer
