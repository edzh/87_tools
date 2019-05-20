import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { apiUrl } from 'config';

import FamilyDetailsDeleteModal from './FamilyDetailsDeleteModal';
import FamilyPins from './FamilyPins';
import EditFamily from './EditFamily';

export default ({ family, edit, setEdit }) => {
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
      <button onClick={() => setEdit(!edit)}>Edit</button>
      {!edit ? (
        <h2 className="">{family.name}</h2>
      ) : (
        <EditFamily family={family} />
      )}

      <div className="border w-1/3">
        <h3 className="">Children</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Grade</th>
            </tr>
          </thead>
          <tbody>
            {family.students &&
              family.students.map(student =>
                student ? (
                  <tr className="">
                    <td>
                      <Link to={`/student/${student._id}`}>{student.name}</Link>
                    </td>
                    <td>{student.grade}</td>
                  </tr>
                ) : (
                  <p>No student assigned!</p>
                )
              )}
          </tbody>
        </table>
      </div>

      <FamilyPins family={family} />

      <button
        className="p-1 bg-red text-white border rounded"
        onClick={() => setShowModal(!showModal)}
      >
        Delete
      </button>
      {showModal && (
        <FamilyDetailsDeleteModal>
          <div className="p-4 border rounded mx-auto shadow bg-white opacity-100 z-10">
            <h3>
              Are you sure?{' '}
              <button
                className="p-1 text-xl bold"
                onClick={() => setShowModal(!showModal)}
              >
                x
              </button>
            </h3>
            <button
              className="p-1 bg-red text-white border rounded"
              onClick={() => removeFamily(family._id)}
            >
              Delete
            </button>
          </div>
        </FamilyDetailsDeleteModal>
      )}
    </div>
  );
};
