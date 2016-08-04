import React from 'react';

import Board from './Board.jsx';
import MyInput from './MyInput.jsx';

function hideAForm(status, props) {
  return props.toggleEditForm(status, status.replace(' ','').toUpperCase());;
}
var Form = React.createClass({
  submit(data) { //on data submit, send all data as a normal form
    var req = new XMLHttpRequest();
    req.open('POST', '/', true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(data));
    this.props.updateBoard();
    hideAForm(data.status, this.props);
  },
  backArrow () {
    if(this.props.status === undefined) {
      return '↩';
    }
  },
  checkValues () {
    var state = this.props.status;
    if(state) {
      return [state.title,state.priority,state.createdBy,state.assignedTo,state.status];
    } else {
      return ['','','','',''];
    }
  },
  render() {
    var values = this.checkValues();
    return (
      <div className="formDiv">
        <Formsy.Form id="form" onSubmit={this.submit} className="input">
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
            onClick={() => {hideAForm('',this.props)}}
            className="backArrow">{(this.backArrow())}
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