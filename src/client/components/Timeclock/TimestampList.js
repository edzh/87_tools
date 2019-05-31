import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { apiUrl } from 'config';
import { useDebounce, useFormInput } from 'hooks';

import TimestampListHeader from './TimestampListHeader';
import TimestampListRow from './TimestampListRow';

export default function TimestampList({ timesheet, setRefresh }) {
  const query = useFormInput('');
  const debouncedSearchTerm = useDebounce(query.value, 250);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef();

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = search(debouncedSearchTerm, timesheet.timestamp);
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (showSearch) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  const removeTimestamp = async timestampId => {
    try {
      const timestamp = await fetch(
        `${process.env.REACT_APP_API_URL}/api/timestamp/${timestampId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('id_token')}`
          }
        }
      ).then(() => {
        setRefresh(true);
      });

      return timestamp;
    } catch (e) {
      return Promise.reject();
    }
  };

  if (!timesheet.timestamp) {
    return <p>loading...</p>;
  }

  return (
    <div className="mb-3 border shadow-md rounded mt-4 lg:mt-0">
      <div className="flex p-4 bg-grey-darkest shadow">
        <h2 className="font-normal text-white">
          {timesheet.io === 'in' ? 'Sign In' : 'Sign Out'} -{' '}
          {format(timesheet.date, 'dddd, MMMM D')}
        </h2>
        <div className="ml-auto">
          <button
            className={`bg-white text-xs rounded mr-2 p-1`}
            onClick={() => setRefresh(true)}
          >
            Refresh
          </button>
          <button
            className={`${showSearch &&
              'bg-blue text-white'} bg-white text-xs rounded p-1`}
            onClick={() => setShowSearch(!showSearch)}
          >
            Search
          </button>
        </div>
      </div>
      <div
        className="overflow-auto w-full block"
        style={{ WebkitOverflowScrolling: 'touch', height: '530px' }}
      >
        {showSearch && (
          <input
            className="p-2 shadow-inner rounded border m-4 mb-2"
            placeholder="Search Name"
            type="text"
            {...query}
            ref={searchRef}
          />
        )}
        <TimestampListHeader />
        {showSuggestions
          ? filteredSuggestions.map(timestamp => (
              <TimestampListRow
                removeTimestamp={removeTimestamp}
                timesheet={timesheet}
                key={timestamp._id}
                timestamp={timestamp}
              />
            ))
          : timesheet.timestamp.map(timestamp => (
              <TimestampListRow
                removeTimestamp={removeTimestamp}
                timesheet={timesheet}
                key={timestamp._id}
                timestamp={timestamp}
              />
            ))}
      </div>
    </div>
  );
}

// Search from timestamp list
function search(search, list) {
  const filtered = list.filter(suggestion => {
    return (
      suggestion.student.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  });

  return filtered;
}
