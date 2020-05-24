import {
  actionTypes
} from "./actionTypes";
import http from "@/utils/http";


export const setPage = (page) => {
  return {
    type: actionTypes.SET_PAGE,
    page: page
  }
}

function getHomeListAction(homeList) {
  return {
    type: actionTypes.GET_HOME_LIST,
    homeList
  }
}

export function getHomeList(params = {}, isServer = false) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      http.get('/api/v1/topics', {
          isServer,
          params
        })
        .then(res => {

          dispatch(getHomeListAction(res.data))
          resolve && resolve(res.result)
        })
    })
  }
}