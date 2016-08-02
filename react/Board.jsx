import React from 'react';
import Column from './Column.jsx';

var Board = React.createClass({
  getInitialState: function(){
    return {};
  },
  updateBoard () {
    this.queryDatabase();
  },
  componentDidMount() {
    this.queryDatabase();
  },
  queryDatabase () {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/data');
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
        <Column updateBoard={this.updateBoard} data={this.state.data} />
      </div>
    )
  }
});
Board.defaultProps = {
  data: [],
};

Board.propTypes = {
  data: React.PropTypes.array,
};
export default Board;