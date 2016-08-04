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

  toggleEditFormQueue (state) {
    this.props.toggleEditFormQueue(state);
  },
  toggleEditFormInProgress (state) {
    this.props.toggleEditFormInProgress(state);
  },
  toggleEditFormDone (state) {
    this.props.toggleEditFormDone(state);
  },
  render() {
    return (
      <div>
        <Column
        isEditing={this.props.isEditing}

        toggleEditFormQueue={this.toggleEditFormQueue}
        showEditFormQueue={this.props.showEditFormQueue}
        showEditFormQueueState={this.props.showEditFormQueueState}

        toggleEditFormInProgress={this.toggleEditFormInProgress}
        showEditFormInProgress={this.props.showEditFormInProgress}
        showEditFormInProgressState={this.props.showEditFormInProgressState}

        toggleEditFormDone={this.toggleEditFormDone}
        showEditFormDone={this.props.showEditFormDone}
        showEditFormDoneState={this.props.showEditFormDoneState}

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

    toggleEditFormQueue: (status) => {
      dispatch({
        type:'TOGGLE_EDIT_FORM_QUEUE',
        status,
      })
    },
    toggleEditFormInProgress: (status) => {
      dispatch({
        type:'TOGGLE_EDIT_FORM_INPROGRESS',
        status,
      })
    },
    toggleEditFormDone: (status) => {
      dispatch({
        type:'TOGGLE_EDIT_FORM_DONE',
        status,
      })
    },
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Board);
