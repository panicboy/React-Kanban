export const updateBoard = (data) => {
  dispatch({
    type: 'UPDATE_BOARD',
    data,
  });
};
export const toggleEditForm = (state, status) => {
  dispatch({
    type:`TOGGLE_EDIT_FORM_${status}`,
    state,
  });
};