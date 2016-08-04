import Immutable from 'immutable';

var initialState = Immutable.Map({
  showForm:false,
  showEditFormQueue:false,
  showEditFormQueueState: 0,
  showEditFormInProgress:false,
  showEditFormInProgressState: 0,
  showEditFormDone:false,
  showEditFormDoneState: 0,
  editFormsBeingShown: 0,
  data: [],
});

var boardReducer = (state = initialState, action) => {
  var newState = state;
  switch(action.type) {
    case 'UPDATE_BOARD':
      return newState.set("data", action.data);
    case 'SHOW_FORM':
      newState = newState.update("showForm", bool => bool = true);
      return newState;
    case 'HIDE_FORM':
      newState = newState.update("showForm", bool => bool = false );
      return newState;
    case 'SHOW_EDIT_FORM_QUEUE':
      newState = newState.update("showEditFormQueue", bool => bool = true);
      newState = newState.set("editFormsBeingShown", 1);
      newState = newState.set("showEditFormQueueState", action.status);
      return newState;
    case 'HIDE_EDIT_FORM_QUEUE':
      newState = newState.update("showEditFormQueue", bool => bool = false);
      newState = newState.set("showEditFormQueueState", {});
      newState = newState.set("editFormsBeingShown", 0);
      return newState;
    case 'SHOW_EDIT_FORM_INPROGRESS':
      newState = newState.update("showEditFormInProgress", bool => bool = true);
      newState = newState.set("editFormsBeingShown", 1);
      newState = newState.set("showEditFormInProgressState", action.status);
      return newState;
    case 'HIDE_EDIT_FORM_INPROGRESS':
      newState = newState.update("showEditFormInProgress", bool => bool = false);
      newState = newState.set("showEditFormInProgressState", {});
      newState = newState.set("editFormsBeingShown", 0);
      return newState;
    case 'SHOW_EDIT_FORM_DONE':
      newState = newState.update("showEditFormDone", bool => bool = true);
      newState = newState.set("editFormsBeingShown", 1);
      newState = newState.set("showEditFormDoneState", action.status);
      return newState;
    case 'HIDE_EDIT_FORM_DONE':
      newState = newState.update("showEditFormDone", bool => bool = false);
      newState = newState.set("showEditFormDoneState", {});
      newState = newState.set("editFormsBeingShown", 0);
      return newState;
    default:
      return newState;
  }
};

export default boardReducer;