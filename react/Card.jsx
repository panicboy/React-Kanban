import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import Form from './Form.jsx';

var Card = React.createClass({
  getInitialState() {
    return {
      title: '',
      priority: '',
      createdBy: '',
      assignedTo: '',
      status: '',
    };
  },
  componentDidMount() {
    this.setState({
      title: this.props.data.title,
      priority: this.props.data.priority,
      createdBy: this.props.data.createdBy,
      assignedTo: this.props.data.assignedTo,
      status: this.props.data.status,
    });
  },
  dragStart(event) {
    var cardData = {
      id: this.props.data._id,
      status: this.props.data.status,
    };
    event.dataTransfer.setData('text', JSON.stringify(cardData));
  },
  handleStatusLeft () {
    var status = this.props.data.status.replace(/\s/g, '');;
    status = {Queue: 'Done', Done: 'In Progress', InProgress: 'Queue'}[status];
    this.createReq('status', status);
  },
  handleStatusRight () {
    var status = this.props.data.status.replace(/\s/g, '');
    status = {Queue: 'In Progress', InProgress: 'Done', Done: 'Queue'}[status];
    this.createReq('status', status);
  },
  cyclePriority(){
    var thePriority = this.state.priority.toLowerCase();
    if('low medium high blocker'.indexOf(thePriority) < 0) {
      thePriority = 'blocker';
    }
    thePriority =  {low: 'Medium', medium: 'High', high: 'Blocker', blocker: 'Low'}[thePriority];
    this.createReq('priority', thePriority);
    this.setState({priority: thePriority}); //added to fix bug where cycle priority wasn't working with edit
  },
  createReq (fieldName, fieldValue) {
    var myRequest = {
      id : this.props.data._id || 0,
    };
    myRequest[fieldName] = fieldValue;
    var req = new XMLHttpRequest();
    req.open('PUT', `/edit/`);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load', (data) => {
      this.props.updateBoard();
    });
    req.send(JSON.stringify(
      myRequest
    ));
  },
  deleteItem () {
    var req = new XMLHttpRequest();
    req.open('DELETE', '/delete/');
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load', (data) => {
      this.props.updateBoard();
    });
    req.send(JSON.stringify({
      "id":`${this.props.data._id}`,
    }))
  },
  editItem () { //on edit button click
    if(!this.props.editFormsBeingShown) {
      this.deleteItem(); //delete item so no duplicates since the form is just be rerendered
      try {
        this.props.renderEditFormQueue(this.state);
      } catch (e) {
        try {
          this.props.renderEditFormInProgress(this.state);
        } catch (e) {
          this.props.renderEditFormDone(this.state);
        }
      }
    }
  },
  timestamp () {
    var date = new Date(this.props.data.updatedAt);
    return date.toLocaleTimeString('en-US', { hour12: false });
  },
  render() {
    return (
       <div key={this.props.data._id} className={`card ${this.state.priority}`} data-id={this.props.data._id} data-status={this.state.status} data-updatedat={this.props.data.updatedAt} draggable="true" onDragStart={this.dragStart}>
        <span onClick={this.deleteItem} className="close">&#120;</span>
        <span onClick={this.editItem} className="edit">&#9998;</span>
        <span className="timestamp">{this.timestamp()}</span>
        <span className="title small">{this.props.data.title}</span>
        <span className="assigned-to small">Assignee: {this.props.data.assignedTo}</span>
        <span className="created-by small">Assignor: {this.props.data.createdBy}</span>
        <span className="priority small" onClick={this.cyclePriority}>Priority: {this.props.data.priority}</span>
        <span className="status small" onClick={this.handleStatusRight}>Status: {this.props.data.status}</span>
        <button onClick={this.handleStatusLeft}>&larr;</button>
        <button onClick={this.handleStatusRight}>&rarr;</button>
      </div>
    )
  }
});

export default Card;