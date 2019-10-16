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
  // const [date, setDate] = useState(format(new Date(), 'YYYY-MM-DDT') + '04:00:00Z')
  const [date, setDate] = useState('2019-09-24T04:00:00Z');
  console.log(date);

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

  const absentStudents = todayStudents
    .filter(student => {
      return (
        timestamp.signin &&
        !timestamp.signin.find(t => t.student._id === student._id)
      );
    })
    .filter(student => student.grade !== 0);

  return (
    <div>
      <h2 className="p-2 text-xl font-bold">
        {format(date, 'dddd, MMMM DD, YYYY')}
      </h2>
      <div className="flex p-2">
        <div className="mr-4 overflow-auto p-2" style={{ height: '360px' }}>
          <h3 className="font-bold">Absent</h3>
          {absentStudents.map(student => (
            <div key={student._id} className="flex">
              <div className="w-64">{student.name}</div>
              <div>
                {student.currentClubs.find(club => club.day === day).name}
              </div>
            </div>
          ))}
        </div>
        <div className="overflow-auto p-2" style={{ height: '360px' }}>
          <h3 className="font-bold">Present</h3>
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
  );
}
