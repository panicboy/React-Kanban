import React from 'react';

var Card = React.createClass({
  handleStatusLeft () {
    status = {Queue: 'Done', Done: 'InProgress', InProgress: 'Queue'}[this.props.data.status];
    this.createReq(status, 'status');
  },
  handleStatusRight () {
    status = {Queue: 'InProgress', InProgress: 'Done', Done: 'Queue'}[this.props.data.status];
    this.createReq(status, 'status');
  },
  createReq (fieldValue, fieldToUpdate) {
    var req = new XMLHttpRequest();
      req.open('PUT', `/edit/`);
      req.setRequestHeader("Content-Type", "application/json");
      req.addEventListener('load', (data) => {
        this.props.updateBoard();
      });
      req.send(JSON.stringify({
     "id":`${this.props.data._id}`,
     `"#{fieldToUpdate}"`: `${fieldValue}`
    }));
  },
  cyclePriority(thePriority){
    if('low medium high blocker Low Medium High Blocker'.indexOf(thePriority) < 0) return 'Low';
    return {Low: 'Medium', Medium: 'High', High: 'Blocker', Blocker: 'Low'}[thePriority];
    this.createReq(thePriority, 'priority');
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
  render() {
    return (
      <div key={this.props.data._id} className={'card small small-card ' + this.props.data.priority} data-id={this.props.data._id} data-createdat={this.props.data.createdAt} draggable="true">
        <span onClick={this.deleteItem} className="close">×</span>
        <span className="title small">{this.props.data.title}</span>
        <span className="assigned-to small">{this.props.data.assignedTo}</span>
        <span className="created-by small">{this.props.data.createdBy}</span>
        <span className="priority small">{this.props.data.priority}  onClick={this.cyclePriority}</span>
        <span className="status small">{this.props.data.status} onClick={this.handleStatusRight}</span>
        <br/>
        <button onClick={this.handleStatusLeft}>&larr;</button>
        <button onClick={this.handleStatusRight}>&rarr;</button>
        </div>
    )
  }
});
export default Card;