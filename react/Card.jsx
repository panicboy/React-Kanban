import React from 'react';
import ReactDOM from 'react-dom';

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
  handleStatusLeft () {
    var status = this.props.data.status.replace(/\s/g, '');;
    status = {Queue: 'Done', Done: 'In Progress', InProgress: 'Queue'}[status];
    this.createReq(status);
  },
  handleStatusRight () {
    var status = this.props.data.status.replace(/\s/g, '');
    status = {Queue: 'In Progress', InProgress: 'Done', Done: 'Queue'}[status];
    this.createReq(status);
  },
  createReq (status) {
    var req = new XMLHttpRequest();
    req.open('PUT', `/edit/`);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load', (data) => {
      this.props.updateBoard();
    });
    req.send(JSON.stringify({
      "id":`${this.props.data._id}`,
      "status": `${status}`
    }));
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
  editItem () {
    //on edit button click
    ReactDOM.render(<Form {...this.state}/>,document.getElementById('content'));
    this.deleteItem(); //delete item so no duplicates since the form is just be rerendered
  },
  timestamp () {
    var date = new Date(this.props.data.createdAt);
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear() - 2000}`;
  },
  render() {
    return (
      <div key={this.props.data._id} className={`card ${this.props.data.priority}`} data-id={this.props.data._id} data-createdat={this.props.data.createdAt} draggable="true">
        <span onClick={this.deleteItem} className="close">&#120;</span>
        <span onClick={this.editItem} className="edit">&#9998;</span>
        <span className="timestamp">{this.timestamp()}</span>
        <span className="title small">{this.props.data.title}</span>
        <span className="assigned-to small">Assignee: {this.props.data.assignedTo}</span>
        <span className="created-by small">Assignor: {this.props.data.createdBy}</span>
        <span className="priority small">Priority: {this.props.data.priority}</span>
        <span className="status small">Status: {this.props.data.status}</span>
        <button onClick={this.handleStatusLeft}>&larr;</button>
        <button onClick={this.handleStatusRight}>&rarr;</button>
      </div>
    )
  }
});

export default Card;