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
  // setBoard () {
  //   var req = new XMLHttpRequest();
  //   req.open('GET', '/data');
  //   req.addEventListener('load', this.setBoardData);
  //   req.send();
  // },
  // setBoardData(data) {
  //   this.props.setBoard(JSON.parse(data.currentTarget.response));
  //   console.log(this.props.data);
  // },
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
    // this.setState({
    //   showEditFormQueue:true,
    //   showEditFormQueueState: state,
    //   editFormsBeingShown: 1,
    // });
    this.props.renderEditFormQueue(state);
  },
  renderEditFormInProgress (state) {
    this.setState({
      showEditFormInProgress:true,
      showEditFormInProgressState: state,
      editFormsBeingShown: 1,
    });
  },
  renderEditFormDone (state) {
    this.setState({
      showEditFormDone:true,
      showEditFormDoneState: state,
      editFormsBeingShown: 1,
    });
  },
  hideForm () {
    this.props.hideForm();
  },
  hideEditFormQueue () {
    this.setState({
      showEditFormQueue: false,
      showEditFormQueueState: {},
      editFormsBeingShown: 0,
    })
  },
  hideEditFormInProgress () {
    this.setState({
      showEditFormInProgress: false,
      showEditFormInProgressState: {},
      editFormsBeingShown: 0,
    })
  },
  hideEditFormDone () {
    this.setState({
      showEditFormDone: false,
      showEditFormDoneState: {},
      editFormsBeingShown: 0,
    })
  },
  render() {
    return (
      <div>
        <Column editFormsBeingShown={this.props.editFormsBeingShown} showEditFormQueue={this.props.showEditFormQueueState}  showEditFormInProgressState={this.props.showEditFormInProgressState}  showEditFormDoneState={this.props.showEditFormDoneState} showEditFormQueue={this.props.showEditFormQueue} showEditFormInProgress={this.props.showEditFormInProgress} showEditFormDone={this.props.showEditFormDone} renderEditFormQueue={this.renderEditFormQueue} hideEditFormQueue={this.hideEditFormQueue} renderEditFormInProgress={this.renderEditFormInProgress} hideEditFormInProgress={this.hideEditFormInProgress} renderEditFormDone={this.renderEditFormDone} hideEditFormDone={this.hideEditFormDone} showForm={this.props.showForm} hideForm={this.hideForm} updateBoard={this.updateBoard} data={this.props.data} />
        <div className="center">
          <span onClick={this.renderForm} className="newCard">&#43;</span>
        </div>
      </div>
    )
  }
});
var mapStateToProps = (state) => {
  // var stateBoardReducer = state.boardReducer.toJS()
  return {
    data: state.boardReducer.toJS().data,
    showForm:state.boardReducer.toJS().showForm,
    showEditFormQueue:state.boardReducer.toJS().showEditFormQueue,
    showEditFormQueueState:state.boardReducer.toJS().showFormQueueState,
    showEditFormInProgress:state.boardReducer.toJS().showFormInProgress,
    showEditFormInProgressState:state.boardReducer.toJS().showFormInProgressState,
    showEditFormDone:state.boardReducer.toJS().showEditFormDone,
    showEditFormDoneState: state.boardReducer.toJS().showFormDoneState,
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
        type:'SHOW_FORM',
      })
    },
    hideForm: () => {
      dispatch({
        type:'HIDE_FORM',
      })
    },
    renderEditFormQueue: (data) => {
      dispatch({
        type:'SHOW_EDIT_FORM_QUEUE',
        data,
      })
    }
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Board);
