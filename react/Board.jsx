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
    return (
      <div>
        <header>
          <h1>KANBAN BOARD</h1>
        </header>
        <Column
        isEditing={this.props.isEditing}
        updateBoard={this.updateBoard}

        form={this.props.form}

        editForm_Q={this.props.editForm_Q}
        editForm_QState={this.props.editForm_QState}

        editForm_IP={this.props.editForm_IP}
        editForm_IPState={this.props.editForm_IPState}

        editForm_D={this.props.editForm_D}
        editForm_DState={this.props.editForm_DState}

        toggleEditForm={this.toggleEditForm}

        data={this.props.data}
      />
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
