import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCurrentProgram } from '../../actions/programActions';

function DefaultSessionButton(props) {
  return (
    <div>
      <button
        onClick={() =>
          props.updateCurrentProgram({
            ...props.program,
            currentSession: props.sessionId
          })
        }
      >
        Set Current Program
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
