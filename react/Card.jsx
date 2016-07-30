import React from 'react';

var Card = React.createClass({
  render() {
    return (
      <div key={this.props.data._id} className="card small" data-id={this.props.data._id} data-createdat={this.props.data.createdAt}
        <p className="title small">{this.props.data.title}</p>
        <ul>
          <li className="assigned-to small">{this.props.data.assignedTo}</li>
          <li className="created-by small">{this.props.data.createdBy}</li>
          <li className="priority small">{this.props.data.priority}</li>
          <li className="status small">{this.props.data.status}</li>
        </ul>
      </div>
    )
  }
});
export default Card;