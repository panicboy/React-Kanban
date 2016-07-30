import React from 'react';
import Card from './Card.jsx';

var Column = React.createClass({
  getDefaultProps() {
    return {
      data: []
    };
  },
  render() {
    var data = this.props.data;
    var cards = data.map( (e) => {
      return (
        <Card data={e}/>
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