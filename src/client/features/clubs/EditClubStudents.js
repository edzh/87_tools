import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import {
  fetchStudentsByClub,
  fetchClubById
} from '../../features/clubs/clubSlice';

import ClubStudentList from '../../components/Club/ClubStudentList';

export default function EditClubStudents({ match }) {
  const dispatch = useDispatch();
  const clubPage = useSelector(state => state.clubPageReducer);
  const { students } = clubPage;
  const clubId = match.params.id;

  useEffect(() => {
    dispatch(fetchStudentsByClub(clubId));
    dispatch(fetchClubById(clubId));
  }, [clubId]);

  return <ClubStudentList students={students} />;
}
