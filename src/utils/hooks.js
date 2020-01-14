import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const useFetchPin = async pin => {
  const pinExists = await fetch(
    `${process.env.REACT_APP_API_URL}/api/pin/${pin}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    }
  )
    .then(response => response.json())
    .then(json => json.data)
    .catch(() => false);

  return pinExists;
};

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

export function useDebouncedAutocomplete(items, ids, delay) {
  function search(search, list, listById) {
    const filtered = list.filter(suggestion => {
      return (
        listById[suggestion].name.toLowerCase().indexOf(search.toLowerCase()) >
        -1
      );
    });

    return filtered;
  }

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, delay);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (debouncedQuery) {
      const filtered = search(debouncedQuery, ids, items);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  return {
    input: (
      <input
        className="border w-full rounded-t p-1"
        placeholder="search here..."
        type="text"
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
    ),
    suggestions,
    query: {
      get: query,
      set: setQuery
    }
  };
}
