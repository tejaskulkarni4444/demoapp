export const serviceAction = (data) => dispatch => {
  dispatch({
    type: 'SIMPLE_ACTION',
    payload: data
  })
 }
 export const userAction = (data) => dispatch => {
  dispatch({
    type: 'USER_ACTION',
    payload: data
  })
 }