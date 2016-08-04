import React from 'react';

import Form from './Form.jsx';
import Column from './Column.jsx';

import Immutable from 'immutable';
import {connect} from 'react-redux';

var Board =  React.createClass({
  componentDidMount() {
    this.updateBoard();
  },
  updateBoard () {
    this.queryDatabase();
  },
  queryDatabase () {
    var req = new XMLHttpRequest();
    req.open('GET', '/data');
    req.addEventListener('load', this.loadData);
    req.send();
  },
  loadData (data) {
    this.props.updateBoard(JSON.parse(data.currentTarget.response));
  },
  renderForm () {
    this.props.renderForm();
  },
  hideForm () {
    this.props.hideForm();
  },
  toggleEditForm (state, status) {
    this.props.toggleEditForm(state, status);
  },

  render() {
    return (
      <div>
        <Column
        isEditing={this.props.isEditing}

        showEditFormQueue={this.props.showEditFormQueue}
        showEditFormQueueState={this.props.showEditFormQueueState}

        showEditFormInProgress={this.props.showEditFormInProgress}
        showEditFormInProgressState={this.props.showEditFormInProgressState}

        showEditFormDone={this.props.showEditFormDone}
        showEditFormDoneState={this.props.showEditFormDoneState}

        toggleEditForm={this.toggleEditForm}

        showForm={this.props.showForm}
        hideForm={this.hideForm}
        updateBoard={this.updateBoard}
        data={this.props.data} />
        <div className="center">
          <span onClick={this.renderForm} className="newCard">&#43;</span>
        </div>
      </div>
    )
  }
});
var mapStateToProps = (state) => {
  var s = state.boardReducer.toJS();
  return {
    data: s.data,
    showForm:s.showForm,
    showEditFormQueue:s.showEditFormQueue,
    showEditFormQueueState:s.showEditFormQueueState,
    showEditFormInProgress:s.showEditFormInProgress,
    showEditFormInProgressState:s.showEditFormInProgressState,
    showEditFormDone:s.showEditFormDone,
    showEditFormDoneState: s.showEditFormDoneState,
    isEditing: s.isEditing,
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: (data) => {
      dispatch({
        type: 'UPDATE_BOARD',
        data,
      })
    },

    renderForm: () => {dispatch({type: 'SHOW_FORM'})},
    hideForm: () => {dispatch({type:'HIDE_FORM'})},

    toggleEditForm: (state, status) => {
      dispatch({
        type:`TOGGLE_EDIT_FORM_${status}`,
        state,
      })
    },

  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Board);
