import React from 'react';

import Board from './Board.jsx';
import MyInput from './MyInput.jsx';

var Form = React.createClass({
  submit(data) { //on data submit, send all data as a normal form
    var req = new XMLHttpRequest();
    if(data.id.length < 2) req.open('POST', '/', true);
    if(data.id.length > 1) req.open('PUT', '/edit/', true);
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
      // add id to the form to determine if it's new or an update
    var state = this.props.status;
    console.log('cardState: ', state);
    if(state) {
      return [state.title, state.priority, state.createdBy, state.assignedTo, state.status, state._id];
    } else {
      return ['','','','','',''];
    }
  },
  render() {
    var values = this.checkValues();
    return (
      <div className="formDiv">
        <Formsy.Form
          id="form"
          onSubmit={this.submit}
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
            validationError="Please choose either Low, Medium, High, or Blocker."
          />
          <MyInput
            value={values[2]}
            name="createdBy"
            title="Created By"
          />
          <MyInput
            value={values[3]}
            name="assignedTo"
            title="Assigned To"
          />
          <MyInput
            value={values[4]}
            name="status"
            type="hidden"
          />
          <MyInput
            value={values[5]}
            name="id"
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