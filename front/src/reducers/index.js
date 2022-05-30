import { combineReducers } from 'redux'
import user from './user'
import article from './article'
import word from './word'

const rootReducer = combineReducers({
  user,
  article,
  word,
})

export default rootReducer
