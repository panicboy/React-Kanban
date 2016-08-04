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
      return newState.update("showForm", bool => bool = true);
    case 'HIDE_FORM':
      return newState.update("showForm", bool => bool = false );
    case 'SHOW_EDIT_FORM_QUEUE':
      return newStateShow(newState, 'Queue', action);
    case 'HIDE_EDIT_FORM_QUEUE':
      return newStateHide(newState, 'Queue', action);
    case 'SHOW_EDIT_FORM_INPROGRESS':
      return newStateShow(newState, 'InProgress', action);
    case 'HIDE_EDIT_FORM_INPROGRESS':
      return newStateHide(newState, 'InProgress', action);
    case 'SHOW_EDIT_FORM_DONE':
      return newStateShow(newState, 'Done', action);
    case 'HIDE_EDIT_FORM_DONE':
      return newStateHide(newState, 'Done', action);
    default:
      return newState;
  }
};
function newStateShow(newState, status, action) {
  newState = newState.update(`showEditForm${status}`, bool => bool = true);
  newState = newState.set(`showEditForm${status}State`, action.status);
  newState = newState.set("editFormsBeingShown", 1);
  return newState;
}
function newStateHide(newState, status, action) {
  newState = newState.update(`showEditForm${status}`, bool => bool = false);
  newState = newState.set(`showEditForm${status}State`, {});
  newState = newState.set("editFormsBeingShown", 0);
  return newState;
}

export default boardReducer;