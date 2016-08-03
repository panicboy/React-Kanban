'use strict';

import Immutable from 'immutable';

const initialState = Immutable.List();

const boardReducer = (state = initialState, action) => {

  let newState = state;

  switch(action.type) {

    // case 'SET_ITEMS':
    //   return Immutable.fromJS(action.data);

    // case 'DELETE_ITEM':
    // console.log('state: ', state);
    //   return state.delete(action.indx);

    default:
     return newState;
  }
};

export default boardReducer;