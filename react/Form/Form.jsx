"use strict";
import React from 'react';

import Board from '../Board/Board.jsx';
import MyInput from './MyInput.jsx';

const Form = React.createClass({
  handleSubmit(data) { //on data submit, send all data as a normal form
    let req = new XMLHttpRequest();
    req.open('POST', '/', true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(data));
    this.props.updateBoard();
    this.hideAForm(data.status);
  },
  hideAForm(status) {
    return this.props.toggleEditForm(status, status.replace(' ','').toUpperCase());
  },
  backArrow () {
    if(this.props.status === undefined) {
      return '↩';
    }
  },
  checkValues () {
    let state = this.props.status;
    if(state) {
      return [state.title,state.priority,state.createdBy,state.assignedTo,state.status];
    }
    return ['','','','',''];
  },
  render() {
    let values = this.checkValues();
    return (
      <div className="formDiv">
        <Formsy.Form
          id="form"
          onSubmit={this.handleSubmit}
          className="input"
        >
          <MyInput
            value={values[0]}
            name="title"
            title="Title"
          />
          <MyInput
            value={values[1]}
            name="priority"
            title="Priority"
            validations="isIn:['low','medium','high','blocker','Low','Medium','High','Blocker']"
            validationError="Please choose either low, medium, high, or blocker."
          />
          <MyInput
            value={values[2]}
            name="createdby"
            title="Created By"
          />
          <MyInput
            value={values[3]}
            name="assignedto"
            title="Assigned To"
          />
          <MyInput
            value={values[4]}
            name="status"
            type="hidden"
          />
          <button type="submit">
            Submit
          </button>
        </Formsy.Form>
        <div className="center">
          <span
            onClick={() => {this.hideAForm('')}}
            className="backArrow"
          >
            {(this.backArrow())}
          </span>
        </div>
      </div>
    );
  }
});

Formsy.addValidationRule('isIn', function (values, value, array) {
  return array.indexOf(value) >= 0;
}); //validation for priority, checks if input is in array passed in

export default Form;