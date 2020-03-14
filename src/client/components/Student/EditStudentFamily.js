import React, { useState, useEffect } from 'react';
import { useFormInput } from 'utils/hooks';

export default props => {
  const [fetchedFamilies, setFetchedFamilies] = useState([]);
  const family = useFormInput(
    props.student.family ? props.student.family._id : ''
  );

  useEffect(() => {
    const fetchFamilies = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/api/family`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('id_token')}`
          }
        }
      )
        .then(response => response.json())
        .then(json => json.data);

      setFetchedFamilies(result);
    };

    fetchFamilies();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    editStudent();
  }

  function editStudent() {
    fetch(`${process.env.REACT_APP_API_URL}/api/student/${props.student._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify({
        family: family.value
      })
    }).then(() => {
      // props.setEditFamily(!props.editFamily);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <select className="p-2 mt-4 text-sm border rounded" {...family}>
        <option value="">---</option>
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
      <button className="p-2 my-4 btn hover:bg-blue-400 block" type="submit">
        Submit
      </button>
    </form>
  );
};
