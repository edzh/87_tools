import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPrograms, addProgram } from '../actions/programActions';
import { getCurrentSession } from '../actions/sessionActions';
import { updateUser } from '../actions/userActions';

import ProgramList from '../components/Program/ProgramList';
import ProgramForm from '../components/Program/ProgramForm';

function Program({ fetchPrograms, programs, user, updateUser, addProgram }) {
  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <div>
      <ProgramList programs={programs} updateUser={updateUser} user={user} />
      <ProgramForm user={user} addProgram={addProgram} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    programs: state.program.programs,
    user: state.user.data,
    currentProgram: state.session.currentSession
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
