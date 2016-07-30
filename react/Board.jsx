import React from 'react';
import Column from './Column.jsx';

var Board = React.createClass({
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
    var parsedData = JSON.parse(data.currentTarget.response);
    this.setState({data:parsedData});
  },
  render() {
    return (
      <div>
        <Column data={this.state.data} />
      </div>
    )
  }
});
export default Board;