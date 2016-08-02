import React from 'react';
import ReactDOM from 'react-dom';

import Board from './Board.jsx';
import MyInput from './MyInput.jsx';

var Form = React.createClass({
  getInitialState() {
    return {
      canSubmit: false, //Submit button disabled by default
      title: '',
      priority: '',
      createdBy: '',
      assignedTo: '',
      status: '',
    };
  },
  componentDidMount() {
    this.setState({
      title: this.props.title,
      priority: this.props.priority,
      createdBy: this.props.createdBy,
      assignedTo: this.props.assignedTo,
      status: this.props.status,
    });
  },
  submit(data) { //on data submit, send all data as a normal form
    var req = new XMLHttpRequest();
    req.open('POST', '/', true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(data));
    ReactDOM.render(<Board />,document.getElementById('content'));
  },
  enableButton() { //triggered by onValid input by Formsy, enabled submit button
    this.setState({
      canSubmit: true,
    });
  },
  disableButton() {
    this.setState({
      canSubmit: false,
    });
  },
  //these two methods disable the back button while editing
  back () {
    this.props.hideForm();
  },
  shouldIback () {
    if(this.state.title === undefined) {
      return '↩';
    }
  },
  render() {
    return (
      <div className="formDiv">
        <Formsy.Form id="form" onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="input">
          <MyInput value={this.state.title} name="title" title="Title" required />
          <MyInput value={this.state.priority} name="priority" title="Priority" validations="isIn:['low','medium','high','blocker','Low','Medium','High','Blocker']" validationError="Please choose either low, medium, high, or blocker." required />
          <MyInput value={this.state.createdBy} name="createdby" title="Created By" required />
          <MyInput value={this.state.assignedTo} name="assignedto" title="Assigned To" required />
          <MyInput value={this.state.status} name="status" type="hidden" />
          <button type="submit" disabled={!this.state.canSubmit}> Submit </button>
        </Formsy.Form>
        <div className="center">
          <span onClick={this.back} className="backArrow">{this.shouldIback()}</span>
        </div>
      </div>
    );
  }
});

Formsy.addValidationRule('isIn', function (values, value, array) {
  return array.indexOf(value) >= 0;
}); //validation for priority, checks if input is in array passed in

export default Form;