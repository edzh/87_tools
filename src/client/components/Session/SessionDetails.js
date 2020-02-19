import React from 'react';
import ClubList from '../Club/ClubList';
import ClubForm from '../Club/ClubForm';

export default function SessionDetails({ addCurrentSessionClub, session }) {
  return (
    <div>
      <ClubList clubs={session.clubs} session={session} />
      <ClubForm
        addCurrentSessionClub={addCurrentSessionClub}
        session={session.item}
      />
    </div>
  );
}
