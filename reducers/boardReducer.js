import Immutable from 'immutable';

var initialState = Immutable.Map();

var boardReducer = (state = initialState, action) => {
  console.log(state);
  var newState = state;
  switch(action.type) {
    case 'UPDATE_BOARD':
      return Immutable.fromJS(action.data);
      break;
    case 'REMOVE_ITEM':
      return state.delete(action.id);
      break;
    default:
      return newState;
  }

};

export default boardReducer;