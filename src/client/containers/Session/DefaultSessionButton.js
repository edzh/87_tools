import React from 'react';
import { connect } from 'react-redux';

import { updateCurrentProgram } from '../../actions/programActions';

function DefaultSessionButton({ sessionId, program, updateCurrentProgram }) {
  return (
    <div>
      <button
        className="mx-4 text-sm px-2 bg-gray-200 hover:bg-gray-100 rounded border border-gray-400"
        onClick={() =>
          updateCurrentProgram({
            ...program.byId[program.allIds],
            currentSession: sessionId
          })
        }
      >
        Set As Default
      </button>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    sessionId: ownProps.sessionId,
    program: state.currentProgram.item
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentProgram: program => {
      dispatch(updateCurrentProgram(program));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultSessionButton);
