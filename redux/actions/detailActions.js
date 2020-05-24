import {
  actionTypes
} from "./actionTypes";
import http from "@/utils/http";

function getHomeDetailAction(detailInfo) {
  return {
    type: actionTypes.GET_HOME_DETAIL,
    detailInfo
  }
}


export function getHomeDetail(params = {}, isServer = false) {
  
  return dispatch => {
    return new Promise((resolve, reject) => {
      http.get(`/api/v1/topic/${params.id}`, {
        isServer
      })
      .then(res => {
        dispatch(getHomeDetailAction(res.data))
        resolve && resolve(res.result)
      })
    })
  }
}