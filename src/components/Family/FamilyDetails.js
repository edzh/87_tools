import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import config from 'config';

import FamilyDetailsDeleteModal from './FamilyDetailsDeleteModal';
import FamilyPins from './FamilyPins';
import EditFamily from './EditFamily';

export default ({ family, editDetails, setEditDetails }) => {
  const [showModal, setShowModal] = useState(false);
  console.log(family._id);

  const removeFamily = async familyId => {
    try {
      const family = await fetch(`${config.apiUrl}/api/family/${familyId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${config.token}`
        }
      }).then(() => {
        return <Redirect to={'/family'} />;
      });
    } catch (e) {
      return Promise.reject();
    }
  };

  return (
    <div className="border rounded shadow-md">
      <div className="flex border-b bg-grey-darkest w-full">
        <h2 className="m-4 font-normal text-white">{family.name}</h2>
        <button
          className={`${
            editDetails ? 'bg-blue text-white' : 'bg-white'
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
          {family.students &&
            family.students.map(student =>
              student ? (
                <div className="flex my-4">
                  <Link
                    className="no-underline w-64"
                    to={`/student/${student._id}`}
                  >
                    <p className="text-blue hover:text-blue-light">
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

      {/*<button
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
            )}*/}
    </div>
  );
};
