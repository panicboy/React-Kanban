var MyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    var className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
    var errorMessage = this.getErrorMessage();
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

ReactDOM.render(<Form />, document.getElementById('form'));

var Board = React.createClass({
  render() {
    var columns = ColumnTypes.map( (element) => {
      return (
        <Column type={element} />
      )
    })
  return (
      <div>
        {columns}
      </div>
  )
  }
});

var ColumnTypes = ['Queue', 'InProgress', 'Done'];
var Column = React.createClass({
  render() {
    switch(this.props.type) {
      case 'Queue':
        queryDatabase('');
        break;
      case 'InProgress':
        queryDatabase('');
        break;
      case: 'Done':
        queryDatabase('');
        break;
      default:

    }
    var cards = ..map( (e) => {
      return (
        <Card />
      )
    })
    return (
      <div id={this.props.type} className="column">
        <Card />
      </div>
  )
  }
});
function queryDatabase (e) {
  // query database for things matching e
}

var Card = React.createClass({
  render() {
    return (
      <div className="card">

      </div>
    )
  }
});
ReactDOM.render(<Board />, document.getElementById("board"));