import React from 'react';
import MainDetailsHeader from '../Details/MainDetailsHeader';
import ClubList from '../Club/ClubList';

export default function SessionDetails({ session }) {
  return (
    <div>
      <MainDetailsHeader>{session.item.name}</MainDetailsHeader>
      <ClubList clubs={session.clubs} session={session} />
    </div>
  );
}
