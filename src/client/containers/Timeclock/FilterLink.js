import React from 'react';
import { connect } from 'react-redux';
import { setTimestampFilters } from '../../actions/timesheetActions';

function Link({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      disabled={active}
      className={`${
        active ? 'text-blue-400 border-b-2 border-blue-400' : 'font-normal'
      } mr-2`}
    >
      {children}
    </button>
  );
}

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.timestamp.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setTimestampFilters(ownProps.filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
