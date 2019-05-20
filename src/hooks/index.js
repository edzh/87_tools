import React, { useState, useEffect } from 'react';
import { apiUrl } from 'config';

export const useFetchPin = async pin => {
  const pinExists = await fetch(`${apiUrl}/api/pin/${pin}`)
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
