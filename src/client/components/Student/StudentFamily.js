import React from 'react';
import { Link } from 'react-router-dom';
import EditStudentFamily from './EditStudentFamily';

export default ({ student, family, editFamily, setEditFamily }) => {
  return (
    <div className="border rounded shadow-md my-4">
      <div className="flex border-b">
        <h3 className="text-xl m-4">Family</h3>
        <button
          className={`${
            editFamily ? 'bg-blue text-white' : 'bg-white'
          } m-4 ml-auto text-xs border rounded shadow p-1`}
          onClick={() => setEditFamily(!editFamily)}
        >
          Edit
        </button>
      </div>
      {editFamily ? (
        <EditStudentFamily
          student={student}
          family={family}
          editFamily={editFamily}
          setEditFamily={setEditFamily}
        />
      ) : (
        family && (
          <div className="m-4">
            <Link to={`/family/id/${family._id}`} className="no-underline">
              <p className="text-xl text-blue-dark hover:text-blue">
                {family.name}
              </p>
            </Link>
            <h3 className="my-2">Pickups</h3>
            {family.pickups.map((pickup, index) => (
              <div className="flex" key={index}>
                <p className="w-64 text-bold">{pickup.name}</p>
                <p>{pickup.pin}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
