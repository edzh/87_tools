import React from 'react';
import { Link } from 'react-router-dom';

import EditStudentFamily from './EditStudentFamily';

export default ({ currentStudent }) => {
  if (!currentStudent.allIds) return null;

  return (
    <div>
      <h2 className="font-bold text-xl">Family</h2>
      <EditStudentFamily student={currentStudent.byId[currentStudent.allIds]} />
      {currentStudent.byId[currentStudent.allIds].family && (
        <div className="m-4">
          <Link
            to={`/family/${
              currentStudent.byId[currentStudent.allIds].family._id
            }`}
            className="no-underline"
          >
            <p className="text-xl text-blue-600  hover:text-blue">
              {currentStudent.byId[currentStudent.allIds].family.name}
            </p>
          </Link>
          <h3 className="my-2">Pickups</h3>
          {currentStudent.byId[currentStudent.allIds].family.pickups.map(
            (pickup, index) => (
              <div className="flex" key={index}>
                <p className="w-64 text-bold">{pickup.name}</p>
                <p>{pickup.pin}</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
