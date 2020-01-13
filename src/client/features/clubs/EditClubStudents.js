import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import {
  fetchStudentsByClub,
  fetchClubById
} from '../../features/clubs/clubSlice';

export default function EditClubStudents() {
  const dispatch = useDispatch();
  const clubPage = useSelector(state => state.clubPageReducer);
  const clubId = '5d7037b1a4034f37a4ff3488';
  console.log(clubPage);

  useEffect(() => {
    dispatch(fetchStudentsByClub(clubId));
    dispatch(fetchClubById(clubId));
  }, [clubId]);

  return <div></div>;
}
