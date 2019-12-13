import React from 'react';
import { Link } from 'react-router-dom';

import EditStudentFamily from './EditStudentFamily';

export default ({ student }) => {
  return (
    <div>
      <h2 className="font-bold text-xl">Family</h2>
      <EditStudentFamily student={student.item[student.byId]} />
      {student.item[student.byId].family && (
        <div className="m-4">
          <Link
            to={`/family/${student.item[student.byId].family._id}`}
            className="no-underline"
          >
            <p className="text-xl text-blue-600  hover:text-blue">
              {student.item[student.byId].family.name}
            </p>
          </Link>
          <h3 className="my-2">Pickups</h3>
          {student.item[student.byId].family.pickups.map((pickup, index) => (
            <div className="flex" key={index}>
              <p className="w-64 text-bold">{pickup.name}</p>
              <p>{pickup.pin}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
