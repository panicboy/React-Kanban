import React from 'react';

import Form from './Form.jsx';
import Column from './Column.jsx';

import style from "../scss/styles.scss";

import Immutable from 'immutable';
import {connect} from 'react-redux';

const Board = React.createClass({
  componentDidMount() {
    this.updateBoard();
  },
  updateBoard () {
    this.queryDatabase();
  },
  queryDatabase () {
    let req = new XMLHttpRequest();
    req.open('GET', '/data');
    req.addEventListener('load', this.loadData);
    req.send();
  },
  loadData (data) {
    this.props.updateBoard(JSON.parse(data.currentTarget.response));
  },
  toggleEditForm (state, status) {
    this.props.toggleEditForm(state, status);
  },
  render() {
    var props = {
      isEditing: this.props.isEditing,
      updateBoard: this.updateBoard,
      form: this.props.form,
      toggleEditForm: this.toggleEditForm,
      data: this.props.data,
    };
    ['Q','IP','D'].forEach((e) => {
      props['editForm_' + e] = this.props['editForm_' + e];
      props['editForm_' + e + 'State'] = this.props['editForm_' + e + 'State'];
    });
    return (
      <div>
        <header>
          <h1>KANBAN BOARD</h1>
        </header>
        <Column {... props} />
        <div className="center">
          <span
            onClick={() => {this.toggleEditForm('','')}}
            className="newCard"
          >
            &#43;
          </span>
        </div>
      </div>
    )
  }
});

var boardActions = require('./../actions/boardActions');
var mapStateToProps = boardActions.mapStateToProps;
var mapDispatchToProps = boardActions.mapDispatchToProps;

export default connect(mapStateToProps,mapDispatchToProps)(Board);
