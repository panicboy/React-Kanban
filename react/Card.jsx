import React from 'react';

import Form from './Form.jsx';

const Card = React.createClass({
  dragStart(event) {
    let cardData = {
      id: this.props.data._id,
      status: this.props.data.status,
    };
    event.dataTransfer.setData('text', JSON.stringify(cardData));
  },
  handleStatus (direction) {
    let newStatus = this.props.data.status.replace(/\s/g, '');
    if (direction === 'right') {
      newStatus = {Queue: 'In Progress', InProgress: 'Done', Done: 'Queue'}[newStatus];
    } else {
      newStatus = {Queue: 'Done', Done: 'In Progress', InProgress: 'Queue'}[newStatus];
    }
    this.createPutRequest('status', newStatus);
  },
  cyclePriority() {
    let newPriority = this.props.data.priority.toLowerCase();
    if(!'low medium high blocker'.includes(newPriority)) {
     newPriority = 'blocker';
    }
    newPriority =  {low: 'Medium', medium: 'High', high: 'Blocker', blocker: 'Low'}[newPriority];
    this.createPutRequest('priority', newPriority);
  },
  createPutRequest (fieldName, fieldValue) {
    let myRequest = {
      id : this.props.data._id || 0,
    };
    myRequest[fieldName] = fieldValue;
    let req = new XMLHttpRequest();
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
    let req = new XMLHttpRequest();
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
    if(!this.props.isEditing) {
      this.deleteItem(); //delete item so no duplicates since the form is just be rerendered
      this.props.toggleEditForm(this.props.data, this.props.data.status.replace(' ','').toUpperCase());
    }
  },
  timestamp () {
    let date = new Date(this.props.data.createdAt);
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear() - 2000}`;
  },
  render() {
    return (
      <div
        key={this.props.data._id}
        className={`card ${this.props.data.priority}`}
        data-id={this.props.data._id}
        data-status={this.props.data.status}
        data-updatedat={this.props.data.updatedAt}
        draggable="true"
        onDragStart={this.dragStart}
      >
        <span
          onClick={this.deleteItem}
          className="close"
        >
          &#120;
        </span>
        <span
          onClick={this.editItem}
          className="edit"
        >
          &#9998;
        </span>
        <span
          className="timestamp"
        >
          {this.timestamp()}
        </span>
        <span
          className="title">
          {this.props.data.title}
        </span>
        <span
          className="assigned-to"
        >
          Assignee: {this.props.data.assignedTo}
        </span>
        <span
          className="created-by"
        >
          Assignor: {this.props.data.createdBy}
        </span>
        <span
          className="priority"
          onClick={this.cyclePriority}
        >
          Priority: {this.props.data.priority}
        </span>
        <span
          className="status"
          onClick={() => {this.handleStatus('right')}}
        >
          Status: {this.props.data.status}
        </span>
        <button
          onClick={() => {this.handleStatus('left')}}
        >
          &larr;
        </button>
        <button
          onClick={() => {this.handleStatus('right')}}
        >
          &rarr;
        </button>
      </div>
    )
  }
});


export default Card;


