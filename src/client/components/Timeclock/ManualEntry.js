import React, { useState, useEffect } from 'react';
import { useDebounce } from 'hooks';
import styles from './css/ManualEntry.module.css';
import NameFilter from '../Student/NameFilter';

export default function ManualEntry(props) {
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 250);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = search(debouncedSearchTerm, props.students);
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    props.fetchStudents();
  }, []);

  function onChange(e) {
    setQuery(e.target.value);
  }

  const handleInput = (student, fobStatus) => {
    props.postTimestamp(student, fobStatus).catch(err => props.setMessage(err));
  };

  return (
    <div className="border rounded shadow-md mt-4">
      <div className="border-b p-4">
        <h2 className="font-normal">Manual Entry</h2>
        <NameFilter query={query} onChange={onChange} />
      </div>
      <div className="overflow-auto w-full shadow-inner block">
        <div className="block h-32">
          {filteredSuggestions.length !== 0 ? (
            filteredSuggestions.map((student, index) => (
              <div key={student._id} className="p-2 border-b block w-full flex">
                <p className="pl-2 py-1 w-3/4">{student.name}</p>
                <p className="flex">
                  <button
                    className="border hover:text-white hover:bg-blue text-xs p-1 mr-1 rounded"
                    onClick={() => handleInput(student, 'Lost')}
                  >
                    Lost
                  </button>
                  <button
                    className="border hover:text-white hover:bg-blue text-xs p-1 mr-1 rounded"
                    onClick={() => handleInput(student, 'Damaged')}
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
    </div>
  );
}
function search(search, list) {
  const filtered = list.filter(suggestion => {
    return suggestion.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
  });

  return filtered;
}
