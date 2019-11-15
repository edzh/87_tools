import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCurrentProgram } from '../../actions/programActions';

function DefaultSessionButton(props) {
  return (
    <div>
      <button
        className="mx-4 text-sm px-2 bg-gray-200 hover:bg-gray-100 rounded border border-gray-400"
        onClick={() =>
          props.updateCurrentProgram({
            ...props.program,
            currentSession: props.sessionId
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
