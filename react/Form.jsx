import React from 'react';
import MyInput from './MyInput.jsx';

var Form = React.createClass({
  getInitialState() {
    return {
      canSubmit: false //Submit button disabled by defaultl
    };
  },
  submit(data) { //on data submit, send all data as a normal form
    var req = new XMLHttpRequest();
    req.open('POST', '/', true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(data));
  },
  enableButton() { //triggered by onValid input by Formsy, enabled submit button
    this.setState({
      canSubmit: true
    });
  },
  disableButton() {
    this.setState({
      canSubmit: false
    });
  },
  render() {
    return (
      <Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="input">
        <MyInput name="title" title="Title" required />
        <MyInput name="priority" title="Priority" validations="isIn:['low','medium','high','blocker','Low','Medium','High','Blocker']" validationError="Please choose either low, medium, high, or blocker." required />
        <MyInput name="createdby" title="Created By" required />
        <MyInput name="assignedto" title="Assigned To" required />
        <button type="submit" disabled={!this.state.canSubmit}> Submit </button>
      </Formsy.Form>
    );
  }
});

Formsy.addValidationRule('isIn', function (values, value, array) {
  return array.indexOf(value) >= 0;
}); //validation for priority, checks if input is in array passed in

export default Form;