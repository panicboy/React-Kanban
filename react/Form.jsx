import React from 'react';
import MyInput from './MyInput.jsx';

var Form = React.createClass({
  getInitialState() {
    return {
      canSubmit: false
    };
  },
  submit(data) {
    var req = new XMLHttpRequest();
    req.open('POST', '/', true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(data));
  },
  enableButton() {
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
        <MyInput name="title" title="Title:" required />
        <MyInput name="priority" title="Priority:" required />
        <MyInput name="createdby" title="Created By:" required />
        <MyInput name="assignedto" title="Assigned To:" required />
        <button type="submit" disabled={!this.state.canSubmit}> Submit </button>
      </Formsy.Form>
    );
  }
});

export default Form;

export default Form;