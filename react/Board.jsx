import React from 'react';

import Form from './Form.jsx';
import Column from './Column.jsx';

//redux
import Immutable from 'immutable';
import {connect} from 'react-redux';

var Board =  React.createClass({
  getInitialState: function(){
    return {
      showForm:false,
      showEditFormQueue:false,
      showEditFormQueueState: {},
      showEditFormInProgress:false,
      showEditFormInProgressState: {},
      showEditFormDone:false,
      showEditFormDoneState: {},
      editFormsBeingShown: 0,
    };
  },
  updateBoard () {
  //passed down to children as a prop to update board
    this.queryDatabase();
  },
  componentDidMount() {
    this.queryDatabase();
  },
  queryDatabase () {
    var req = new XMLHttpRequest();
    req.open('GET', '/data');
    req.addEventListener('load', this.loadData);
    req.send();
  },
  loadData (data) {
    this.setState({
      data:JSON.parse(data.currentTarget.response),
    });
  },
  renderForm () {
    this.setState({
      showForm:true,
    });
  },
  renderEditFormQueue (state) {
    this.setState({
      showEditFormQueue:true,
      showEditFormQueueState: state,
      editFormsBeingShown: 1,
    });
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
    this.setState({
      showForm:false,
    });
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
        <Column editFormsBeingShown={this.state.editFormsBeingShown} showEditFormQueueState={this.state.showEditFormQueueState}  showEditFormInProgressState={this.state.showEditFormInProgressState}  showEditFormDoneState={this.state.showEditFormDoneState} showEditFormQueue={this.state.showEditFormQueue} showEditFormInProgress={this.state.showEditFormInProgress} showEditFormDone={this.state.showEditFormDone} renderEditFormQueue={this.renderEditFormQueue} hideEditFormQueue={this.hideEditFormQueue} renderEditFormInProgress={this.renderEditFormInProgress} hideEditFormInProgress={this.hideEditFormInProgress} renderEditFormDone={this.renderEditFormDone} hideEditFormDone={this.hideEditFormDone} showForm={this.state.showForm} hideForm={this.hideForm} updateBoard={this.updateBoard} data={this.state.data} />
        <div className="center">
          <span onClick={this.renderForm} className="newCard">&#43;</span>
        </div>
      </div>
    )
  }
});

var mapStateToProps = (state, ownProps) => {
  return {};
};
var mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: () => {
      dispatch({
        type: 'UPDATE_BOARD',
      })
    }
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Board);
