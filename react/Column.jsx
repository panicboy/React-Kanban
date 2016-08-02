import React from 'react';
import Card from './Card.jsx';

import Form from './Form.jsx';

var Column = React.createClass({
  getDefaultProps() {
    return {
      data: [],
    };
  },
  preventDefault (event) {
    event.preventDefault();
  },
  drop (event) {
    event.preventDefault();
    let cardData;
    try {
      cardData = JSON.parse(event.dataTransfer.getData('text'));
    } catch (e) {
      // If the text data isn't parsable we'll just ignore it.
      console.log(`couldn't parse dropped data: `, e);
      return;
    }
    // Do something with the data
    let newStatus = null;
    if(event.target.id.length >3) newStatus = event.target.id;
    if(event.target.getAttribute("data-status") !== null) newStatus = event.target.getAttribute("data-status");
    if(newStatus === null) newStatus = event.target.parentNode.parentNode.id;
    if(newStatus == 'InProgress') newStatus = 'In Progress';
    if('Queue In Progress Done Blocker'.indexOf(newStatus) >= 0 ) cardData.status = newStatus;

    let req = new XMLHttpRequest();
    req.open('PUT', `/edit/`);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load', (data) => {
      this.props.updateBoard();
    });
    req.send(JSON.stringify(
      cardData
    ));
  },
  render() {
    var cards = this.createByColumn(this.props.data);
    return (
      <div className="container column-holder">
        <div id="Queue" className="column" onDragOver={this.preventDefault} onDrop={this.drop}>
          {cards[0]}
          {this.props.showForm ? <Form hideForm={this.props.hideForm} /> : null}
        </div>
        <div id="InProgress" className="column" onDragOver={this.preventDefault} onDrop={this.drop}>
          {cards[1]}
        </div>
        <div id="Done" className="column" onDragOver={this.preventDefault} onDrop={this.drop}>
          {cards[2]}
        </div>
      </div>
    )
  },
  createByColumn(data) {
    var queueArr = [];
    var inProgressArr = [];
    var doneArr = [];
    data.forEach( (e,i,a) => {
      switch(e.status) {
        case 'Queue':
          queueArr.push(
            <Card key={i} showForm={this.props.showForm} hideForm={this.props.hideForm} updateBoard={this.props.updateBoard} data={e} />
          )
          break;
        case 'In Progress' || 'InProgress' :
          inProgressArr.push(
            <Card key={i} showForm={this.props.showForm} hideForm={this.props.hideForm} updateBoard={this.props.updateBoard} data={e} />
          )
          break;
        case 'Done':
          doneArr.push(
            <Card key={i} showForm={this.props.showForm} hideForm={this.props.hideForm} updateBoard={this.props.updateBoard} data={e} />
          )
          break;
      }
    });
    return [queueArr, inProgressArr, doneArr];
  },
});

export default Column;