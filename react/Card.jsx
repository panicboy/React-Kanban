import React from 'react';

var Card = React.createClass({
  render() {
    return (
      <div className="card">
        <h1>{this.props.data.title}</h1>
      </div>
    )
  }
});
export default Card;