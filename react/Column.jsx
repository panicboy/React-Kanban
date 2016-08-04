import React from 'react';
import Card from './Card.jsx';

import Form from './Form.jsx';

var Column = React.createClass({
  preventDefault (event) {
    event.preventDefault();
  },
  drop (event) {
    event.preventDefault();
    var cardData;
    try {
      cardData = JSON.parse(event.dataTransfer.getData('text'));
    } catch (e) {
      return;
    }
    var newStatus = null;
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
    var arr = [[],[],[]];
    data.forEach( (e,i,a) => {
      switch(e.status) {
        case 'Queue':
          arr[0].push(
            <Card
            key={i}
            isEditing={this.props.isEditing}
            editForm_Q={this.props.editForm_Q}
            toggleEditForm={this.props.toggleEditForm}

            updateBoard={this.props.updateBoard}
            data={e} />
          )
          break;
        case 'In Progress':
          arr[1].push(
            <Card
              key={i}
              isEditing={this.props.isEditing}
              editForm_IP={this.props.editForm_IP}
              toggleEditForm={this.props.toggleEditForm}

              updateBoard={this.props.updateBoard}
              data={e}
            />
          )
          break;
        case 'Done':
          arr[2].push(
            <Card
              key={i}
              isEditing={this.props.isEditing}
              editForm_D={this.props.editForm_D}
              toggleEditForm={this.props.toggleEditForm}

              updateBoard={this.props.updateBoard}
              data={e}
            />
          )
          break;
      }
    });
    return arr;
  },
  render() {
    var cards;
    if(this.props.data) {
      cards = this.createByColumn(this.props.data);
    }
    return (
      <div className="container column-holder">
        <div
          id="Queue"
          className="column"
          onDragOver={this.preventDefault}
          onDrop={this.drop}
        >
          {cards[0]}
          {this.props.form ?
            (
              <Form
                updateBoard={this.props.updateBoard}
                toggleEditForm={this.props.toggleEditForm}
              />
            ) : null}
          {this.props.editForm_Q ?
            (
              <Form
                updateBoard={this.props.updateBoard}
                status={this.props.editForm_QState}
                toggleEditForm={this.props.toggleEditForm}

              />
            ) : null}
        </div>
        <div id="InProgress"
          className="column"
          onDragOver={this.preventDefault}
          onDrop={this.drop}
        >
        {cards[1]}
        {this.props.editForm_IP ?
          (
            <Form
              updateBoard={this.props.updateBoard}
              status={this.props.editForm_IPState}
              toggleEditForm={this.props.toggleEditForm}
            />
          ) : null}
        </div>
        <div
          id="Done"
          className="column"
          onDragOver={this.preventDefault}
          onDrop={this.drop}
        >
          {cards[2]}
          {this.props.editForm_D ?
            (
              <Form
                updateBoard={this.props.updateBoard}
                status={this.props.editForm_DState}
                toggleEditForm={this.props.toggleEditForm}
              />
            ) : null}
        </div>
      </div>
    )
  },
});

export default Column;