import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function Today({
  students,
  timestamp,
  programId,
  getProgramStudents,
  getDateTimesheetTimestamps
}) {
  const [day, setDay] = useState(+format(new Date(), 'd'));
  const [date, setDate] = useState(
    format(new Date(), 'YYYY-MM-DDT') + '04:00:00Z'
  );
  // const [date, setDate] = useState('2019-09-24T04:00:00Z');

  useEffect(() => {
    programId && getProgramStudents(programId);
  }, [programId]);

  useEffect(() => {
    getDateTimesheetTimestamps(date, 'in');
  }, []);

  useEffect(() => {
    getDateTimesheetTimestamps(date, 'out');
  }, []);

  // const createL

  const todayStudents = students.items.filter(student => {
    let exists = false;
    student.currentClubs.forEach(club => {
      if (club.day === day) exists = true;
    });
    return exists;
  });

  const presentStudents = todayStudents
    .filter(student => {
      return (
        timestamp.signin &&
        !!timestamp.signin.find(t => t.student._id === student._id)
      );
    })
    .sort((a, b) => {
      const clubA = a.currentClubs.find(club => club.day === day).name;
      const clubB = b.currentClubs.find(club => club.day === day).name;

      if (clubA < clubB) return -1;
      if (clubA > clubB) return 1;
      return 0;
    });

  const signedOutStudents = presentStudents.filter(student => {
    return (
      timestamp.signout &&
      !!timestamp.signout.find(t => t.student._id === student._id)
    );
  });

  const absentStudents = todayStudents
    .filter(student => {
      return (
        timestamp.signin &&
        !timestamp.signin.find(t => t.student._id === student._id)
      );
    })
    .filter(student => student.grade !== 0)
    .sort((a, b) => {
      const clubA = a.currentClubs.find(club => club.day === day).name;
      const clubB = b.currentClubs.find(club => club.day === day).name;

      if (clubA < clubB) return -1;
      if (clubA > clubB) return 1;
      return 0;
    });

  const dropInStudents =
    timestamp.signin &&
    timestamp.signin
      .filter(t => t.club === null)
      .sort((a, b) => {
        const clubA = a.student.name;
        const clubB = b.student.name;

        if (clubA < clubB) return -1;
        if (clubA > clubB) return 1;
        return 0;
      });

  return (
    <div>
      <h2 className="p-2 text-xl font-bold">
        {format(date, 'dddd, MMMM DD, YYYY')}
      </h2>
      <div className="flex">
        <div className="mr-4 p-2">
          <h3 className="font-bold">Absent {absentStudents.length}</h3>
          <div className="overflow-auto" style={{ height: '360px' }}>
            {absentStudents.map(student => (
              <div key={student._id} className="flex text-sm">
                <div className="w-64">{student.name}</div>
                <div className="w-64">
                  {student.currentClubs.find(club => club.day === day).name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-2">
          <h3 className="font-bold">Present {presentStudents.length}</h3>
          <div className="overflow-auto" style={{ height: '360px' }}>
            {presentStudents.map(student => (
              <div key={student._id} className="flex text-sm">
                <div className="w-64">{student.name}</div>
                <div className="w-64">
                  {student.currentClubs.find(club => club.day === day).name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-2">
          <h3 className="font-bold">Drop-In</h3>
          <div className="overflow-auto" style={{ height: '360px' }}>
            {dropInStudents &&
              dropInStudents.map(timestamp => (
                <div key={timestamp.student._id} className="flex text-sm">
                  <div className="w-64">{timestamp.student.name}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}