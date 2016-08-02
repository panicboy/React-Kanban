import React from 'react';
import ReactDOM from 'react-dom';

import Form from './Form.jsx';
import Column from './Column.jsx';

var Board = React.createClass({
  getInitialState: function(){
    return {};
  },
  updateBoard () { //passed down to children as a prop to update board when adding/moving a card
    this.queryDatabase();
  },
  componentDidMount() {
    this.queryDatabase();
  },
  queryDatabase () {
    var req = new XMLHttpRequest();
    req.open('GET', '/data');
    req.addEventListener('load', this.loadData);
    req.send();
  },
  loadData (data) {
    this.setState({data:JSON.parse(data.currentTarget.response)});
  },
  renderForm () {
    ReactDOM.render(<Form />, document.getElementById('content'));
  },
  render() {
    return (
      <div>
        <Column updateBoard={this.updateBoard} data={this.state.data} />
        <div className="center">
          <span onClick={this.renderForm} className="newCard">&#43;</span>
        </div>
      </div>
    )
  }
});
export default Board;