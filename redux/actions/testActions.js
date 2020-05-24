import {
  actionTypes
} from "./actionTypes";

export function setNum(num) {
  return {
    type: actionTypes.SET_NUM,
    num
  }
}