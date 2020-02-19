import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

export default function ClubHeader({ currentClub, clubId }) {
  if (!currentClub.allIds) return null;

  return (
    <div className="mb-4">
      <h2 className="pg-header">
        <NavLink to={`/club/${clubId}`}>
          {currentClub.byId[currentClub.allIds].name}
        </NavLink>
      </h2>
      <Navbar clubId={clubId} />
    </div>
  );
}
