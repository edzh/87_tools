import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { useDebounce, useDebouncedAutocomplete } from 'utils/hooks';

import { getStudentsByProgram } from '../../actions/studentActions';
import { addTimestamp } from '../../actions/timeclockActions';

function ManualEntry({
  getStudentsByProgram,
  currentTimesheet,
  students,
  submitPinTimestamp
}) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    if (currentTimesheet.item)
      getStudentsByProgram(currentTimesheet.item.program);
  }, [currentTimesheet.isFetching]);

  const { suggestions, query } = useDebouncedAutocomplete(students, 250);

  return (
    <div className="mt-2 p-2 bg-white border border-gray-200 shadow rounded">
      <h3 className="text-lg font-gray-800 my-2">Manual Entry</h3>
      <input
        className="mb-0 p-2 rounded-l w-full border border-gray-200"
        placeholder="search here..."
        type="text"
        onChange={e => query.set(e.target.value)}
        value={query.get}
      />
      <div className="overflow-auto rounded-b bg-white h-64">
        {suggestions.length !== 0 ? (
          suggestions.map((studentId, index) => (
            <div
              key={studentId}
              className="p-1 border-b block w-full flex text-xs"
            >
              <p className="pl-2 py-1 w-3/4">{students.byId[studentId].name}</p>
              <p className="flex">
                <button
                  className="border hover:text-white hover:bg-blue-500 text-xs p-1 mr-1 rounded"
                  onClick={() => {
                    submitPinTimestamp(students.byId[studentId].pin, 'Lost');
                  }}
                >
                  Lost
                </button>
                <button
                  className="border hover:text-white hover:bg-blue-500 text-xs p-1 mr-1 rounded"
                  onClick={() => {
                    submitPinTimestamp(students.byId[studentId].pin, 'Home');
                  }}
                >
                  Home
                </button>
                <button
                  className="border hover:text-white hover:bg-blue-500 text-xs p-1 mr-1 rounded"
                  onClick={() => {
                    submitPinTimestamp(students.byId[studentId].pin, 'Damaged');
                  }}
                >
                  Damaged
                </button>
                <button
                  className="border hover:text-white hover:bg-blue-500 text-xs p-1 mr-1 rounded"
                  onClick={() => {
                    submitPinTimestamp(students.byId[studentId].pin, 'DNF');
                  }}
                >
                  DNF
                </button>
              </p>
            </div>
          ))
        ) : (
          <div className="bg-gray-200 h-full">
            <p className="text-center text-gray-500 pt-8">Type to search</p>
          </div>
        )}
      </div>
    </div>
  );
}

function search(search, list, listById) {
  const filtered = list.filter(suggestion => {
    return (
      listById[suggestion].name.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  });

  return filtered;
}

const mapStateToProps = state => {
  return {
    students: state.students.items,
    currentTimesheet: state.currentTimesheet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStudentsByProgram: programId => {
      dispatch(getStudentsByProgram(programId));
    },
    addTimestamp: timestamp => {
      dispatch(addTimestamp(timestamp));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManualEntry);
