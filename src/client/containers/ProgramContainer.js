import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPrograms } from '../actions/programActions';
import { getCurrentSession } from '../actions/sessionActions';
import { updateUser } from '../actions/userActions';

import ProgramList from '../components/Program/ProgramList';

function Program(props) {
  useEffect(() => {
    props.fetchPrograms();
  }, []);

  return (
    <div>
      <ProgramList
        programs={props.programs}
        user={props.user}
        updateUser={props.updateUser}
      />
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Program);
