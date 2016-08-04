import React from 'react';

import Form from './Form.jsx';
import Column from './Column.jsx';

import Immutable from 'immutable';
import {connect} from 'react-redux';

var Board = React.createClass({
  componentDidMount() {
    this.updateBoard();
  },
  updateBoard () {
    this.queryDatabase();
  },
  queryDatabase () {
    var req = new XMLHttpRequest();
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


var mapStateToProps = (state) => {
  var s = state.boardReducer.toJS();
  return {
    data: s.data,
    form: s.form,
    editForm_Q: s.editForm_Q,
    editForm_QState: s.editForm_QState,
    editForm_IP: s.editForm_IP,
    editForm_IPState: s.editForm_IPState,
    editForm_D: s.editForm_D,
    editForm_DState: s.editForm_DState,
    isEditing: s.isEditing,
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: (data) => {
      dispatch({
        type: 'UPDATE_BOARD',
        data,
      })
    },
    toggleEditForm: (state, status) => {
      dispatch({
        type:`TOGGLE_EDIT_FORM_${status}`,
        state,
      })
    },
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Board);
