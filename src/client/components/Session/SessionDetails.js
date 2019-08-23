import React from 'react';
import MainDetailsHeader from '../Details/MainDetailsHeader';
import ClubList from '../Club/ClubList';
import ClubForm from '../Club/ClubForm';

export default function SessionDetails({ addCurrentSessionClub, session }) {
  return (
    <div>
      <MainDetailsHeader>{session.item.name}</MainDetailsHeader>
      <ClubList clubs={session.clubs} session={session} />
      <ClubForm
        addCurrentSessionClub={addCurrentSessionClub}
        session={session.item}
      />
    </div>
  );
}
