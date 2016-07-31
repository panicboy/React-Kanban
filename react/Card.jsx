import React from 'react';

var Card = React.createClass({
  statusMoveLeft(theStatus){
    switch (theStatus) {
      case 'Queue':
        return 'Done';
      break;
      case 'Done':
        return 'InProgress';
      break;
      case 'InProgress':
        return 'Queue';
      break;
    }
  },
  statusMoveRight(theStatus){
    switch (theStatus) {
      case 'Queue':
        return 'InProgress';
      break;
      case 'InProgress':
        return 'Done';
      break;
      case 'Done':
        return 'Queue';
      break;
    }
  },
  handleStatusLeft () {
    var status = this.props.data.status;
    status = this.statusMoveLeft(status);
    this.createReq(status);
  },
  handleStatusRight () {
    var status = this.props.data.status;
    status = this.statusMoveRight(status);
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
  render() {
    return (
      <div key={this.props.data._id} className={'card small small-card ' + this.props.data.priority} data-id={this.props.data._id} data-createdat={this.props.data.createdAt}>
        <h2 className="title small">{this.props.data.title}</h2>
          <p className="assigned-to small">{this.props.data.assignedTo}</p>
          <p className="created-by small">{this.props.data.createdBy}</p>
          <p className="priority small">{this.props.data.priority}</p>
          <p className="status small">{this.props.data.status}</p>
        <button onClick={this.handleStatusLeft}>Left</button>
        <button onClick={this.handleStatusRight}>Right</button>
        </div>
    )
  }
});
export default Card;