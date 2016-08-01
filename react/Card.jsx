import React from 'react';

// var Card = React.createClass({
//   handleStatusLeft () {
//     status = {Queue: 'Done', Done: 'InProgress', InProgress: 'Queue'}[this.props.data.status];
//     this.createReq('status', status);
//   },
//   handleStatusRight () {
//     status = {Queue: 'InProgress', InProgress: 'Done', Done: 'Queue'}[this.props.data.status];
//     this.createReq('status', status);
//   },
//   createReq (fieldToUpdate, fieldValue) {
//     var req = new XMLHttpRequest();
//       req.open('PUT', `/edit/`);
//       req.setRequestHeader("Content-Type", "application/json");
//       req.addEventListener('load', (data) => {
//         this.props.updateBoard();
//       });
//       req.send(JSON.stringify({
//      "id":`${this.props.data._id}`,
//      fieldToUpdate: fieldValue
//     }));
//   },
//   cyclePriority(){
//     thePriority = this.props.data.priority;
//     if('low medium high blocker Low Medium High Blocker'.indexOf(thePriority) < 0) return 'Low';
//     return {Low: 'Medium', Medium: 'High', High: 'Blocker', Blocker: 'Low'}[thePriority];
//     this.createReq('priority', thePriority);
//   },
//   deleteItem () {
//     var req = new XMLHttpRequest();
//       req.open('DELETE', '/delete/');
//       req.setRequestHeader("Content-Type", "application/json");
//       req.addEventListener('load', (data) => {
//         this.props.updateBoard();
//       });
//       req.send(JSON.stringify({
//         "id":`${this.props.data._id}`,
//       }))
//   },
//   render() {
//     return (
//       <div key={this.props.data._id} className={'card small small-card ' + this.props.data.priority} data-id={this.props.data._id} data-createdat={this.props.data.createdAt} draggable="true">
//         <span onClick={this.deleteItem} className="close">×</span>
//         <span className="title small">{this.props.data.title}</span>
//         <span className="assigned-to small">{this.props.data.assignedTo}</span>
//         <span className="created-by small">{this.props.data.createdBy}</span>
//         <span className="priority small"  onClick={this.cyclePriority}>{this.props.data.priority}</span>
//         <span className="status small" onClick={this.handleStatusRight}>{this.props.data.status}</span>
//         <br/>
//         <button onClick={this.handleStatusLeft}>&larr;</button>
//         <button onClick={this.handleStatusRight}>&rarr;</button>
//         </div>
//     )
//   }
// });
// export default Card;



var Card = React.createClass({
  handleStatusLeft () {
    var status = {Queue: 'Done', Done: 'InProgress', InProgress: 'Queue'}[this.props.data.status];
    this.createReq('status', status);
  },
  handleStatusRight () {
    var status = {Queue: 'InProgress', InProgress: 'Done', Done: 'Queue'}[this.props.data.status];
    this.createReq('status', status);
  },
  cyclePriority(){
    var thePriority = this.props.data.priority.toLowerCase();
    console.log('priority: ', thePriority);
    if('low medium high blocker'.indexOf(thePriority) < 0) thePriority = 'blocker';
    thePriority =  {low: 'Medium', medium: 'High', high: 'Blocker', blocker: 'Low'}[thePriority];
    this.createReq('priority', thePriority);
  },
  createReq (fieldName, fieldValue ) {
    var myRequest = {id: `${this.props.data._id}`};
    myRequest[fieldName] = fieldValue;
    console.log('myRequest: ', myRequest);
    var req = new XMLHttpRequest();
      req.open('PUT', `/edit/`);
      req.setRequestHeader("Content-Type", "application/json");
      req.addEventListener('load', (data) => {
        this.props.updateBoard();
      });
      req.send(JSON.stringify(myRequest));
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
        <span className="priority small" onClick={this.cyclePriority}>{this.props.data.priority}</span>
        <span className="status small" onClick={this.handleStatusRight}>{this.props.data.status}</span>
        <br/>
        <button onClick={this.handleStatusLeft}>&larr;</button>
        <button onClick={this.handleStatusRight}>&rarr;</button>
        </div>
    )
  }
});
export default Card;