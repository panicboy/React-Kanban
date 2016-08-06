"use strict";
import Immutable from 'immutable';

const initialState = Immutable.Map({
  form:false,
  editForm_Q:false, //Queue
  editForm_QState: {},
  editForm_IP:false, //In Progress
  editForm_IPState: {},
  editForm_D:false, //Done
  editForm_DState: {},
  isEditing: false,
  data: [],
});

const boardReducer = (state = initialState, action) => {
  let newState = state;
  switch(action.type) {
    case 'UPDATE_BOARD':
      return newState.set("data", action.data);
    case 'TOGGLE_EDIT_FORM_':
      return newState.update("form", bool => bool = !bool);
    case 'TOGGLE_EDIT_FORM_QUEUE':
      return toggleVisibility(newState, 'Q', action);
    case 'TOGGLE_EDIT_FORM_INPROGRESS':
      return toggleVisibility(newState, 'IP', action);
    case 'TOGGLE_EDIT_FORM_DONE':
      return toggleVisibility(newState, 'D', action);
    default:
      return newState;
  }
};

const toggleVisibility = (newState, status, action) => {
  newState = newState.update(`editForm_${status}`, bool => bool = !bool);
  if(action.state) newState = newState.set(`editForm_${status}State`, action.state);
  newState = newState.update("isEditing", bool => bool = !bool);
  return newState;
};

export default boardReducer;