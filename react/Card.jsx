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
      </div>
    )
  }
});
export default Card;