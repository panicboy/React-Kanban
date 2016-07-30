import React from 'react';
import Card from './Card.jsx';

var Column = React.createClass({
  render() {
    var cards = this.props.data.map( (e) => {
      return (
        <Card data={e.data}/>
      )
    })
    return (
      <div className="column">
        {cards}
      </div>
    )
  }
});

export default Column;