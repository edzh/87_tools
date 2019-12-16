import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  getProgramFamilies,
  getProgramSessions
} from '../../actions/programActions';

import { getStudentsByProgram } from '../../actions/studentActions';

import Chart from '../../components/Dashboard/Chart';

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

  if (!(students.items.allIds.length && families.items && sessions.items)) {
    return <div className="p-2">Loading...</div>;
  }

  return (
    <div>
      <div className="bg-white w-48 p-2 my-2 rounded border border-gray-400">
        <div className="flex">
          <div className="w-32 font-bold text-gray-800 text-lg">Students</div>
          <div className="w-10 text-lg">{students.items.allIds.length}</div>
        </div>
        <div className="flex">
          <div className="w-32 font-bold text-gray-800 text-lg">Families</div>
          <div className="w-10 text-lg">{families.items.length}</div>
        </div>
        <div className="flex">
          <div className="w-32 font-bold text-gray-800 text-lg">Sessions</div>
          <div className="w-10 text-lg">{sessions.items.length}</div>
        </div>
      </div>
      {/*<Chart />*/}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: ownProps.programId,
    currentProgram: state.currentProgram,
    students: state.students,
    families: state.families,
    sessions: state.sessions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProgramData: programId => {
      Promise.all([
        dispatch(getProgramFamilies(programId)),
        dispatch(getStudentsByProgram(programId)),
        dispatch(getProgramSessions(programId))
      ]);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
