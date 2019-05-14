import React, { useState, useEffect } from 'react';

import { apiUrl } from 'config';

export default props => {
  const [fetchedFamilies, setFetchedFamilies] = useState([]);

  useEffect(() => {
    const fetchFamilies = async () => {
      const result = await fetch(`${apiUrl}/api/family`)
        .then(response => response.json())
        .then(json => json.data);

      setFetchedFamilies(result);
    };
    fetchFamilies();
  }, []);

  return (
    <select value={props.family.value} onChange={props.family.onChange}>
      {fetchedFamilies
        .sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;

          return 0;
        })
        .map(family => (
          <option key={family._id} value={family._id}>
            {family.name}
          </option>
        ))}
    </select>
  );
};
