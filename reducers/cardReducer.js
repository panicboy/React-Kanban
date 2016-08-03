import Immutable from 'immutable';

var initialState = Immutable.Map();

var cardReducer = (state = initialState, action) => {
  var newState = state;
  switch(action.type) {
    case 'UPDATE_CARD':
      return Immutable.fromJS(action.data);
      break;
    default:
      return newState;
  }

};

export default cardReducer;