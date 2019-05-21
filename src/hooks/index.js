import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import config from 'config';
import { Redirect } from 'react-router-dom';

export const useFetchPin = async pin => {
  const pinExists = await fetch(`${config.apiUrl}/api/pin/${pin}`, {
    headers: {
      Authorization: `Bearer ${config.token}`
    }
  })
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
