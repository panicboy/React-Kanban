import Immutable from 'immutable';

var initialState = Immutable.List();

var editReducer = (state = initialState, action) => {
  var newState = state;
  switch(action.type) {
    case 'UPDATE_BOARD':
      // return Immutable.fromJS(action.data);
      break;
    case 'REMOVE_ITEM':
      return state.delete(action.id);
      break;
    default:
      return newState;
  }

};

export default boardReducer;