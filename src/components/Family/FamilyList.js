import React from 'react';
import { Link } from 'react-router-dom';

export default function FamilyList(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Family Name</th>
        </tr>
      </thead>
      <tbody>
        {props.families
          // .sort((a, b) => {})
          .map((family, index) => (
            <tr key={family._id}>
              <td>
                <Link to={`/family/${family._id}`}>{family.name}</Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
