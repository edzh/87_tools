import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { apiUrl } from 'config';

export default ({ family }) => {
  const [showModal, setShowModal] = useState(false);
  console.log(family._id);

  const removeFamily = async familyId => {
    try {
      const family = await fetch(`${apiUrl}/api/family/${familyId}`, {
        method: 'DELETE'
      }).then(() => {
        return <Redirect to={'/family'} />;
      });
    } catch (e) {
      return Promise.reject();
    }
  };

  return (
    <div>
      <ul>
        <li>{family.name}</li>
        {family.students &&
          family.students.map(student =>
            student ? (
              <ul>
                <li>{student.name}</li>
                <li>{student.grade}</li>
              </ul>
            ) : (
              <p>No student assigned!</p>
            )
          )}
        {family.pickups &&
          family.pickups.map(pickup =>
            pickup ? (
              <ul>
                <li>{pickup.name}</li>
                <li>{pickup.pin}</li>
              </ul>
            ) : (
              <p>No pickups assigned!</p>
            )
          )}
      </ul>
      <button
        className="p-2 bg-red text-white border rounded"
        onClick={() => setShowModal(!showModal)}
      >
        Delete
      </button>
      {showModal && (
        <div className="border p-4 rounded absolute">
          <h3>Are you sure?</h3>
          <button
            className="p-2 bg-red text-white border rounded"
            onClick={() => removeFamily(family._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
