import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import FamilyDeleteModal from './FamilyDeleteModal';
import FamilyPins from './FamilyPins';
import EditFamily from './EditFamily';

export default ({ family, editDetails, setEditDetails, familyId }) => {
  const [fetchedFamily, setFetchedFamily] = useState('');

  useEffect(() => {
    const fetchFamily = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/api/family/${familyId}/students`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('id_token')}`
          }
        }
      )
        .then(response => response.json())
        .then(json => json.data);

      setFetchedFamily(result);
    };

    fetchFamily();
  }, []);

  return (
    <div className="border rounded shadow-md">
      <div className="flex border-b bg-gray-800 w-full">
        <h2 className="m-4 font-normal text-white">{family.name}</h2>
        <button
          className={`${
            editDetails ? 'bg-blue-500 text-white' : 'bg-white'
          } m-4 ml-auto text-xs border rounded shadow p-1`}
          onClick={() => setEditDetails(!editDetails)}
        >
          Edit
        </button>
      </div>

      {editDetails ? (
        <EditFamily
          family={family}
          editDetails={editDetails}
          setEditDetails={setEditDetails}
        />
      ) : (
        <div className="m-4">
          <h3>Children</h3>
          <div className="flex mt-4">
            <p className="text-left w-64">Name</p>
            <p className="text-left">Grade</p>
          </div>
          {fetchedFamily &&
            fetchedFamily.map(student =>
              student ? (
                <div key={student._id} className="flex my-4">
                  <Link
                    className="no-underline w-64"
                    to={`/student/${student._id}`}
                  >
                    <p className="text-blue-500 hover:text-blue-400">
                      {student.name}
                    </p>
                  </Link>
                  <p>{student.grade}</p>
                </div>
              ) : (
                <p>No student assigned!</p>
              )
            )}
        </div>
      )}
    </div>
  );
};
