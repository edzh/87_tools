import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { fetchStudents } from '../../features/clubs/clubSlice';

export default function editClubStudents({ clubId }) {
  useEffect(() => {
    fetchStudents(clubId);
  }, [fetchStudents]);

  return <div></div>;
}
