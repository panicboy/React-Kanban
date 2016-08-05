import React from 'react';
import Card from './Card.jsx';

import Form from './Form.jsx';



const Column = React.createClass({
  newCard(i, status, e) {
    var props = {
      key: i,
      isEditing: this.props.isEditing,
      toggleEditForm: this.props.toggleEditForm,
      updateBoard: this.props.updateBoard,
      data: e,
    };
    props['editForm_' + status] = this.props['editForm_' + status];
    return <Card {...props} />
  },
  newForm(status) {
    var props = {
      updateBoard: this.props.updateBoard,
      toggleEditForm: this.props.toggleEditForm,
    };
    if(status) {
      props.status = this.props['editForm_' + status + 'State'];
    }
    return <Form {...props}/>
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
      return;
    }
    let newStatus = null;
    if(event.target.id.length > 3) {
      newStatus = event.target.id;
    }
    if(event.target.getAttribute("data-status") !== null) {
      newStatus = event.target.getAttribute("data-status");
    }
    if(newStatus === null) {
      newStatus = event.target.parentNode.parentNode.id;
    }
    if(newStatus === 'InProgress') {
      newStatus = 'In Progress';
    }
    if('Queue In Progress Done Blocker'.includes(newStatus)) {
      cardData.status = newStatus;
    }
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
  createByColumn(data) {
    let arr = [[],[],[]];
    data.forEach( (e,i,a) => {
      switch(e.status) {
        case 'Queue':
          arr[0].push(this.newCard(i, 'Q', e));
          break;
        case 'In Progress':
          arr[1].push(this.newCard(i, 'IP', e));
          break;
        case 'Done':
          arr[2].push(this.newCard(i, 'D', e));
          break;
      }
    });
    return arr;
  },
  render() {
    let cards;
    if(this.props.data) {
      cards = this.createByColumn(this.props.data);
    }
    var props = {
      className: 'column',
      onDragOver: this.preventDefault,
      onDrop: this.drop,
    };
    return (
      <div className="column-holder">
        <div
          id="Queue"
          {...props}
        >
          {cards[0]}
          {this.props.form ? this.newForm() : null}
          {this.props.editForm_Q ? this.newForm('Q') : null}
        </div>
        <div
          id="InProgress"
          {...props}
        >
        {cards[1]}
        {this.props.editForm_IP ? this.newForm('IP') : null}
        </div>
        <div
          id="Done"
          {...props}
        >
          {cards[2]}
          {this.props.editForm_D ? this.newForm('D') : null}
        </div>
      </div>
    )
  },
});

export default Column;