import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { useDebounce } from 'utils/hooks';

import { getProgramStudents } from '../../actions/programActions';
import { addTimestamp } from '../../actions/timeclockActions';

function ManualEntry({
  getProgramStudents,
  currentTimesheet,
  students,
  submitPinTimestamp
}) {
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 250);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    if (currentTimesheet.item)
      getProgramStudents(currentTimesheet.item.program);
  }, [currentTimesheet.isFetching]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = search(debouncedSearchTerm, students.items);
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        className="border"
        type="text"
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
      <div className="overflow-auto h-32">
        {filteredSuggestions.length !== 0 ? (
          filteredSuggestions.map((student, index) => (
            <div
              key={student._id}
              className="p-1 border-b block w-full flex text-xs"
            >
              <p className="pl-2 py-1 w-3/4">{student.name}</p>
              <p className="flex">
                <button
                  className="border hover:text-white hover:bg-blue text-xs p-1 mr-1 rounded"
                  onClick={() => {
                    console.log(student.pin);
                    submitPinTimestamp(student.pin, 'Lost');
                  }}
                >
                  Lost
                </button>
                <button
                  className="border hover:text-white hover:bg-blue text-xs p-1 mr-1 rounded"
                  onClick={() => {
                    submitPinTimestamp(student.pin, 'Home');
                  }}
                >
                  Home
                </button>
                <button
                  className="border hover:text-white hover:bg-blue text-xs p-1 mr-1 rounded"
                  onClick={() => {
                    submitPinTimestamp(student.pin, 'Damaged');
                  }}
                >
                  Damaged
                </button>
              </p>
            </div>
          ))
        ) : (
          <div className="bg-grey-lightest h-full">
            <p className="text-center text-grey pt-8">Type to search</p>
          </div>
        )}
      </div>
    </div>
  );
}

function search(search, list) {
  const filtered = list.filter(suggestion => {
    return suggestion.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
  });

  return filtered;
}

const mapStateToProps = state => {
  return {
    students: state.student.students,
    currentTimesheet: state.timesheet.currentTimesheet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProgramStudents: programId => {
      dispatch(getProgramStudents(programId));
    },
    addTimestamp: timestamp => {
      dispatch(addTimestamp(timestamp));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManualEntry);
