export const userAction = (data) => dispatch => {
    dispatch({
        type: 'USER_ACTION',
        payload: data
    })
   }