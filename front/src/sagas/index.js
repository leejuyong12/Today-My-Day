import { all, fork } from 'redux-saga/effects'
import userSaga from './user'
import articleSaga from './article'
import wordSaga from './word'

export default function* rootSaga() {
  yield all([fork(userSaga), fork(articleSaga), fork(wordSaga)])
}
