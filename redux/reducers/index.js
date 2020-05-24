import {combineReducers} from "redux";

import home, { initState as homeInitState } from './homeReducers'
import detail, {initialState as detailInitState } from './detailReducers'

import test, { initialState as testInitState } from './testReducers'

export const initalState= {
  test: {
    ...testInitState
  },
  home: {
    ...homeInitState
  },
  detail: {
    ...detailInitState
  }
}

export default combineReducers({
  test,
  home,
  detail
})