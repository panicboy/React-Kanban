import React from 'react';
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
    req.open('GET', 'http://localhost:3000/data');
    req.addEventListener('load', this.loadData);
    req.send();
  },
  loadData (data) {
    this.setState({data:JSON.parse(data.currentTarget.response)});
  },
  render() {
    return (
      <div>
        <Column updateBoard={this.updateBoard} data={this.state.data} />
      </div>
    )
  }
});
export default Board;