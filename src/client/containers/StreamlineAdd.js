import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import StreamlineStudentForm from '../components/Streamline/StreamlineStudentForm';
import StreamlineFamilyForm from '../components/Streamline/StreamlineFamilyForm';

function StreamlineAdd({ programId }) {
  const [createStudent, setCreateStudent] = useState(false);
  const [createFamily, setCreateFamily] = useState(false);

  return (
    <div>
      {(createStudent || createFamily) && (
        <button
          className="cursor-pointer"
          onClick={() => {
            setCreateStudent(false);
            setCreateFamily(false);
          }}
        >
          Back
        </button>
      )}
      {!createStudent && !createFamily && (
        <div className="flex">
          <div
            onClick={() => setCreateStudent(true)}
            className="w-56 h-64 text-center text-white text-3xl pt-24 mr-4 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded shadow"
          >
            New Student
          </div>
          <div
            onClick={() => setCreateFamily(true)}
            className="w-56 h-64 text-center text-white text-3xl pt-24 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded shadow"
          >
            New Family
          </div>
        </div>
      )}
      {createStudent && (
        <div>
          <h2 className="text-xl font-bold text-gray-600">Create Student</h2>
          <StreamlineStudentForm programId={programId} />
        </div>
      )}
      {createFamily && (
        <div>
          <h2 className="text-xl font-bold text-gray-600">Create Family</h2>
          <StreamlineFamilyForm programId={programId} />
        </div>
      )}
    </div>
  );
}

export default StreamlineAdd;
