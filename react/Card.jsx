import React from 'react';

var Card = React.createClass({
  render() {
    return (
      <div className="card">
        <p>{this.props.data.title}</p>
        <ul>
          <li>{this.props.data.assignedTo}</li>
          <li>{this.props.data.createdBy}</li>
          <li>{this.props.data.priority}</li>
          <li>{this.props.data.status}</li>
        </ul>
        <a href={'/edit/' + this.props.data._id}>Right</a>
        </div>
    )
  }
});
export default Card;