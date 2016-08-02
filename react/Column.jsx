import React from 'react';
import Card from './Card.jsx';

import Form from './Form.jsx';

var Column = React.createClass({
  getDefaultProps() {
    return {
      data: [],
    };
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
        <div id="Queue" className="column">
          {cards[0]}
          {this.props.showForm ? <Form updateBoard={this.props.updateBoard} hideForm={this.props.hideForm} /> : null}
          {this.props.showEditFormQueue ? <Form updateBoard={this.props.updateBoard} status={this.props.showEditFormQueueState} hideEditFormQueue={this.props.hideEditFormQueue} /> : null}
        </div>
        <div id="InProgress" className="column">
          {cards[1]}
          {this.props.showEditFormInProgress ? <Form editFormsBeingShown={this.props.editFormsBeingShown} updateBoard={this.props.updateBoard} status={this.props.showEditFormInProgressState} hideEditFormInProgress={this.props.hideEditFormInProgress} /> : null}
        </div>
        <div id="Done" className="column">
          {cards[2]}
          {this.props.showEditFormDone ? <Form editFormsBeingShown={this.props.editFormsBeingShown} updateBoard={this.props.updateBoard} status={this.props.showEditFormDoneState} hideEditFormDone={this.props.hideEditFormDone} /> : null}
        </div>
      </div>
    )
  },
});

export default Column;