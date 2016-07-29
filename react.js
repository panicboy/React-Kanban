const MyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
        />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

const Form = React.createClass({
  getInitialState() {
    return {
      canSubmit: false
    };
  },
  submit(data) {
    alert(JSON.stringify(data, null, 4)); // on Submit
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
        <MyInput name="email" title="Email" validations="isEmail" validationError="This is not a valid email" required />
        <MyInput name="password" title="Password" type="password" required />
        <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
      </Formsy.Form>
    );
  }
});

ReactDOM.render(<Form />, document.getElementById('form'));