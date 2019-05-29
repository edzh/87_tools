import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { apiUrl } from 'config';
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
