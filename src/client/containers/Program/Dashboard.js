import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  getProgramFamilies,
  getProgramStudents,
  getProgramSessions
} from '../../actions/programActions';

function Dashboard({
  programId,
  getAllProgramData,
  currentProgram,
  families,
  students,
  sessions
}) {
  useEffect(() => {
    getAllProgramData(programId);
  }, []);

  if (!(students.items && families.items && sessions.items)) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <p>Students: {students.items.length}</p>
      <p>Families: {families.items.length}</p>
      <p>Sessions: {sessions.items.length}</p>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: ownProps.programId,
    currentProgram: state.program.currentProgram,
    students: state.student.students,
    families: state.family.families,
    sessions: state.session.sessions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProgramData: programId => {
      Promise.all([
        dispatch(getProgramFamilies(programId)),
        dispatch(getProgramStudents(programId)),
        dispatch(getProgramSessions(programId))
      ]);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
