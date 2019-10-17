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

  const todayStudents = students.items.filter(student => {
    let exists = false;
    student.currentClubs.forEach(club => {
      if (club.day === day) exists = true;
    });
    return exists;
  });

  const signedInStudents = todayStudents.filter(student => {
    return (
      timestamp.signin &&
      !!timestamp.signin.find(t => t.student._id === student._id)
    );
  });

  const signedOutStudents = signedInStudents.filter(student => {
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
    .filter(student => student.grade !== 0);

  const dropInStudents = timestamp.signin.filter(t => {
    return !signedInStudents.find(s => s.student._id === t.student._id);
  });

  console.log(dropInStudents);

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
              <div key={student._id} className="flex">
                <div className="w-64">{student.name}</div>
                <div>
                  {student.currentClubs.find(club => club.day === day).name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-2">
          <h3 className="font-bold">Present {signedInStudents.length}</h3>
          <div className="overflow-auto" style={{ height: '360px' }}>
            {signedInStudents.map(student => (
              <div key={student._id} className="flex">
                <div className="w-64">{student.name}</div>
                <div>
                  {student.currentClubs.find(club => club.day === day).name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
