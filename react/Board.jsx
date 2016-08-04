import React from 'react';

import Form from './Form.jsx';
import Column from './Column.jsx';

//redux
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
  renderEditFormQueue (state) {
    this.props.renderEditFormQueue(state);
  },
  renderEditFormInProgress (state) {
    this.props.renderEditFormInProgress(state);
  },
  renderEditFormDone (state) {
    this.props.renderEditFormDone(state);
  },
  hideForm () {
    this.props.hideForm();
  },
  hideEditFormQueue () {
    this.props.hideEditFormQueue();
  },
  hideEditFormInProgress () {
    this.props.hideEditFormInProgress();
  },
  hideEditFormDone () {
    this.props.hideEditFormDone();
  },
  render() {
    return (
      <div>
        <Column editFormsBeingShown={this.props.editFormsBeingShown} showEditFormQueueState={this.props.showEditFormQueueState} showEditFormInProgressState={this.props.showEditFormInProgressState}  showEditFormDoneState={this.props.showEditFormDoneState} showEditFormQueue={this.props.showEditFormQueue} showEditFormInProgress={this.props.showEditFormInProgress} showEditFormDone={this.props.showEditFormDone} renderEditFormQueue={this.renderEditFormQueue} hideEditFormQueue={this.hideEditFormQueue} renderEditFormInProgress={this.renderEditFormInProgress} hideEditFormInProgress={this.hideEditFormInProgress} renderEditFormDone={this.renderEditFormDone} hideEditFormDone={this.hideEditFormDone} showForm={this.props.showForm} hideForm={this.hideForm} updateBoard={this.updateBoard} data={this.props.data} />
        <div className="center">
          <span onClick={this.renderForm} className="newCard">&#43;</span>
        </div>
      </div>
    )
  }
});
var mapStateToProps = (state) => {
  return {
    data: state.boardReducer.toJS().data,
    showForm:state.boardReducer.toJS().showForm,
    showEditFormQueue:state.boardReducer.toJS().showEditFormQueue,
    showEditFormQueueState:state.boardReducer.toJS().showEditFormQueueState,
    showEditFormInProgress:state.boardReducer.toJS().showEditFormInProgress,
    showEditFormInProgressState:state.boardReducer.toJS().showEditFormInProgressState,
    showEditFormDone:state.boardReducer.toJS().showEditFormDone,
    showEditFormDoneState: state.boardReducer.toJS().showEditFormDoneState,
    editFormsBeingShown: state.boardReducer.toJS().editFormsBeingShown,
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
    renderForm: () => {
      dispatch({
        type: 'SHOW_FORM',
      })
    },
    hideForm: () => {
      dispatch({
        type:'HIDE_FORM',
      })
    },
    renderEditFormQueue: (status) => {
      dispatch({
        type:'SHOW_EDIT_FORM_QUEUE',
        status,
      })
    },
    hideEditFormQueue: () => {
      dispatch({
        type:'HIDE_EDIT_FORM_QUEUE',
      })
    },
    renderEditFormInProgress: (status) => {
      dispatch({
        type:'SHOW_EDIT_FORM_INPROGRESS',
        status,
      })
    },
    hideEditFormInProgress: () => {
      dispatch({
        type:'HIDE_EDIT_FORM_INPROGRESS',
      })
    },
    renderEditFormDone: (status) => {
      dispatch({
        type:'SHOW_EDIT_FORM_DONE',
        status,
      })
    },
    hideEditFormDone: () => {
      dispatch({
        type:'HIDE_EDIT_FORM_DONE',
      })
    },
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Board);
