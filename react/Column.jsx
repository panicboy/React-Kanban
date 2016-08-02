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
    var cardData;
    try {
      cardData = JSON.parse(event.dataTransfer.getData('text'));
    } catch (e) { // If the text data isn't parsable ignore it.
      return;
    }
    // Do something with the data
    var newStatus = null;
    if(event.target.id.length > 3) newStatus = event.target.id;
    if(event.target.getAttribute("data-status") !== null) newStatus = event.target.getAttribute("data-status");
    if(newStatus === null) newStatus = event.target.parentNode.parentNode.id;
    if(newStatus == 'InProgress') newStatus = 'In Progress';
    if('Queue In Progress Done Blocker'.indexOf(newStatus) >= 0 ) cardData.status = newStatus;
    if(newStatus == 'InProgress') newStatus = 'In Progress';


    var req = new XMLHttpRequest();
    req.open('PUT', `/edit/`);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener('load', (data) => {
      this.props.updateBoard();
    });
    req.send(JSON.stringify(
      cardData
    ));
  },
  createByColumn(data) {
    var queueArr = [];
    var inProgressArr = [];
    var doneArr = [];
    data.forEach( (e,i,a) => {
      switch(e.status) {
        case 'Queue':
          queueArr.push(
            <Card key={i} editFormsBeingShown={this.props.editFormsBeingShown} renderEditFormQueue={this.props.renderEditFormQueue}  showForm={this.props.showForm} hideForm={this.props.hideForm} updateBoard={this.props.updateBoard} data={e} />
          )
          break;
        case 'In Progress':
          inProgressArr.push(
            <Card key={i} editFormsBeingShown={this.props.editFormsBeingShown} renderEditFormInProgress={this.props.renderEditFormInProgress}  showForm={this.props.showForm} hideForm={this.props.hideForm} updateBoard={this.props.updateBoard} data={e} />
          )
          break;
        case 'Done':
          doneArr.push(
            <Card key={i} editFormsBeingShown={this.props.editFormsBeingShown} renderEditFormDone={this.props.renderEditFormDone}  showForm={this.props.showForm} hideForm={this.props.hideForm} updateBoard={this.props.updateBoard} data={e} />
          )
          break;
      }
    });
    return [queueArr, inProgressArr, doneArr];
  },
  render() {
    var cards = this.createByColumn(this.props.data);
    return (
      <div className="container column-holder">
        <div id="Queue" className="column" onDragOver={this.preventDefault} onDrop={this.drop}>
          {cards[0]}
          {this.props.showForm ? <Form updateBoard={this.props.updateBoard} hideForm={this.props.hideForm} /> : null}
          {this.props.showEditFormQueue ? <Form updateBoard={this.props.updateBoard} status={this.props.showEditFormQueueState} hideEditFormQueue={this.props.hideEditFormQueue} /> : null}
        </div>
        <div id="InProgress" className="column" onDragOver={this.preventDefault} onDrop={this.drop}>
          {cards[1]}
          {this.props.showEditFormInProgress ? <Form editFormsBeingShown={this.props.editFormsBeingShown} updateBoard={this.props.updateBoard} status={this.props.showEditFormInProgressState} hideEditFormInProgress={this.props.hideEditFormInProgress} /> : null}
        </div>
        <div id="Done" className="column" onDragOver={this.preventDefault} onDrop={this.drop}>
          {cards[2]}
          {this.props.showEditFormDone ? <Form editFormsBeingShown={this.props.editFormsBeingShown} updateBoard={this.props.updateBoard} status={this.props.showEditFormDoneState} hideEditFormDone={this.props.hideEditFormDone} /> : null}
        </div>
      </div>
    )
  },
});

export default Column;