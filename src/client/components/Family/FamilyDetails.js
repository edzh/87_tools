import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentFamily, editDetails, students, setEditDetails }) => {
  if (!currentFamily.allIds) return null;
  return (
    <div className="border rounded shadow-md">
      <div className="flex border-b bg-gray-800 w-full">
        <h2 className="m-4 font-normal text-white">
          {currentFamily.byId[currentFamily.allIds].name}
        </h2>
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
        <div></div>
      ) : (
        <div className="m-4">
          <h3>Children</h3>
          <div className="flex mt-4">
            <p className="text-left w-64">Name</p>
            <p className="text-left">Grade</p>
          </div>
          {students.allIds.map(studentId =>
            studentId ? (
              <div key={studentId} className="flex my-4">
                <Link
                  className="no-underline w-64"
                  to={`/student/${studentId}`}
                >
                  <p className="text-blue-500 hover:text-blue-400">
                    {students.byId[studentId].name}
                  </p>
                </Link>
                <p>{students.byId[studentId].grade}</p>
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
