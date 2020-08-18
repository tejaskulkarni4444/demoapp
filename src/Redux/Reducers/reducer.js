export default (state = {}, action) => {
    switch (action.type) {
     case 'SIMPLE_ACTION':
      return {
       result: action.payload
      }
      case 'USER_ACTION':
      return {
       userData: action.payload
      }
     default:
      return state
    }
}