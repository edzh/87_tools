import React from 'react';

export default function FamilyList(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Family Name</th>
        </tr>
      </thead>
      <tbody>
        {props.families.map((family, index) => (
          <tr key={index}>
            <td>{family.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
