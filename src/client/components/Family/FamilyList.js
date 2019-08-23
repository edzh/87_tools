import React from 'react';
import { Link } from 'react-router-dom';

export default function FamilyList(props) {
  return (
    <div className="border rounded shadow-md">
      <h2 className="p-4 border-b font-normal rounded-t bg-grey-darkest text-white shadow">
        Families
      </h2>
      <table className="block overflow-auto">
        <thead className="w-full block">
          <tr className="p-2 border-b w-full block">
            <th className="text-left block">Family Name</th>
          </tr>
        </thead>
        <tbody className="block" style={{ height: '480px' }}>
          {props.families.map((family, index) => (
            <tr key={family._id} className="border-b p-2 block">
              <td>
                <Link
                  to={`/family/${family._id}`}
                  className="no-underline text-blue hover:text-blue-light"
                >
                  {family.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
