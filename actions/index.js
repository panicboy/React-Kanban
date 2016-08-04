import * as types from '../constants/ActionTypes'

export function addTodo() {
  return { type: types.ADD_TODO }
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id }
}

export function editTodo(id) {
  return { type: types.EDIT_TODO, id }
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED }
}
