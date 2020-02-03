import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AddStudentForm from './AddStudentForm';
import ClubStudentList from './ClubStudentList';

export default function ClubStudents() {
  return (
    <div className="border rounded shadow bg-white">
      <div className="flex border-b">
        <h3 className="m-4">Students</h3>
      </div>
      <AddStudentForm />
      <ClubStudentList />
    </div>
  );
}
