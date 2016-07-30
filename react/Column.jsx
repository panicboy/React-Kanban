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
    var cards = this.createByColumn(data);
    return (
      <div>
        <div id="Queue" className="column">
          {cards[0]}
        </div>
        <div id="InProgress" className="column">
          {cards[1]}
        </div>
        <div id="Done" className="column">
          {cards[2]}
        </div>
      </div>
    )
  },
  createByColumn(data) {
    var one = [];
    var two = [];
    var three = [];
    data.forEach( (e) => {
      switch(e.status) {
        case 'Queue':
          one.push(
            <Card data={e} />
          )
          break;
        case 'InProgress':
          two.push(
            <Card data={e} />
          )
          break;
        case 'Done':
          three.push(
            <Card data={e} />
          )
          break;
        // case 'Done':
      }
    });
    return [one, two, three];
  },
});

export default Column;