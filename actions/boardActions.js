"use strict";
const mapStateToProps = (state) => {
  let s = state.boardReducer.toJS();
  return {
    data: s.data,
    form: s.form,
    editForm_Q: s.editForm_Q,
    editForm_QState: s.editForm_QState,
    editForm_IP: s.editForm_IP,
    editForm_IPState: s.editForm_IPState,
    editForm_D: s.editForm_D,
    editForm_DState: s.editForm_DState,
    isEditing: s.isEditing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: (data) => {
      dispatch({
        type: 'UPDATE_BOARD',
        data,
      });
    },
    toggleEditForm: (state, status) => {
      dispatch({
        type:`TOGGLE_EDIT_FORM_${status}`,
        state,
      });
    },
  };
};

module.exports = {
  mapStateToProps: mapStateToProps,
  mapDispatchToProps: mapDispatchToProps,
};