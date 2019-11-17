import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPrograms, addProgram } from '../../actions/programActions';
import { getCurrentSession } from '../../actions/sessionActions';
import { updateUser } from '../../actions/userActions';

import Program from '../../components/Program/Programs';

const mapStateToProps = state => {
  return {
    programs: state.programs,
    user: state.user.data,
    currentProgram: state.currentSession
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPrograms: () => {
      dispatch(fetchPrograms());
    },
    updateUser: user => {
      dispatch(updateUser(user));
    },
    addProgram: program => {
      dispatch(addProgram(program));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Program);
