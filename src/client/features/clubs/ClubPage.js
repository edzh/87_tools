import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Link, Switch } from 'react-router-dom';
import {
  fetchStudentsByClub,
  fetchClubById,
  updateCurrentClub
} from '../../features/clubs/clubSlice';

import { getStudentsByProgram } from 'client/actions/studentActions';
import { getSessionsByProgram } from 'client/actions/sessionActions';

import RouteWithSubroutes from '../../components/Route/RouteWithSubroutes';
import ClubDetails from '../../components/Club/ClubDetails';
import ClubStudentList from '../../components/Club/ClubStudentList';
import ClubHeader from './ClubHeader';

export default function ClubPage({ match, routes }) {
  const [editDetails, setEditDetails] = useState(false);
  const dispatch = useDispatch();
  const clubPage = useSelector(state => state.clubPageReducer);
  const programId = useSelector(state => state.user.item.currentProgram);
  const { students, sessions } = clubPage;
  const clubId = match.params.id;

  useEffect(() => {
    async function fetchData() {
      try {
        await Promise.all([
          dispatch(fetchStudentsByClub(clubId)),
          dispatch(fetchClubById(clubId)),
          dispatch(getStudentsByProgram(programId)),
          dispatch(getSessionsByProgram(programId))
        ]);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [clubId, programId]);

  return (
    <>
      <ClubHeader clubId={clubId} currentClub={clubPage.item} />
      <Switch>
        {routes.map(route => (
          <RouteWithSubroutes key={route.path} {...route} />
        ))}
      </Switch>
    </>
  );
}
