import { getAxios } from '../api'
import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import { WORD_GET_FAILURE, WORD_GET_REQUEST, WORD_GET_SUCCESS } from '../reducers/word'

const axios = getAxios()

function wordGetAPI(data) {
  return axios.get('/word/readAll', { params: { userId: data.userId } })
}

function* wordGet(action) {
  try {
    const res = yield call(wordGetAPI, action.data)
    yield put({
      type: WORD_GET_SUCCESS,
      data: res.data,
    })
  } catch (err) {
    yield put({
      type: WORD_GET_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchWordGet() {
  yield takeLatest(WORD_GET_REQUEST, wordGet)
}

export default function* userSaga() {
  yield all([fork(watchWordGet)])
}
