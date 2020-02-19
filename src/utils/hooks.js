import { useState, useEffect } from 'react';

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
    if (value.length !== 1) {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, delay]);

  return debouncedValue;
}

export function useDebouncedAutocomplete(items, delay) {
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
      const filtered = search(debouncedQuery, items.allIds, items.byId);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, items.allIds, items.byId]);

  return {
    suggestions,
    query: {
      get: query,
      set: setQuery
    }
  };
}

export const usePolling = (func, delay) => {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setRefresh(true);
    }, delay);

    return () => clearTimeout(timeout);
  });

  useEffect(() => {
    func();
  }, [refresh, func]);
};
