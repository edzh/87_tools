import jsPDF from 'jspdf';
import { format } from 'date-fns';

const spacing = 0.2;
const lines = 52;

export function addTimesheetHeader(doc, timesheet) {
  doc.text(
    `${timesheet.io === 'in' ? 'Signed in' : 'Signed out'} sheet for `,
    spacing,
    spacing
  );
  doc.text(format(timesheet.date, 'MMMM DD, YYYY'), 1.4, spacing);
  doc.text('87 Afterschool', 7.4, spacing);
  doc.text('Time', spacing, spacing * 2);
  doc.text('Name', 0.9, spacing * 2);
  doc.text('Club', 3.5, spacing * 2);
  doc.setLineWidth(0.01);
  doc.line(spacing, 1.25 * spacing, 8.5 - spacing, 1.25 * spacing, 'S');
  doc.line(spacing, 2.25 * spacing, 8.5 - spacing, 2.25 * spacing, 'S');
}

export function studentSignInList(doc, timesheet) {
  const timesheetDay = parseInt(format(timesheet.date, 'E'));

  timesheet.timestamp
    .sort((a, b) => sortByName(a, b))
    .forEach((timestamp, index) => {
      const {
        datetime,
        student: { clubs, name }
      } = timestamp;

      const clubByDay = clubs.find(club => club.day === timesheetDay);
      const clubName = clubByDay ? clubByDay.name : 'Drop In';

      const line = index % lines;

      addTimestampRow(
        doc,
        line,
        name,
        clubNameByDay(clubs, timesheetDay),
        datetime,
        index
      );

      if (line === lines - 1) {
        doc.addPage();
        addTimesheetHeader();
      }
    });
}

export function studentClassList(doc, timesheet) {
  const timesheetDay = parseInt(format(timesheet.date, 'E'));

  timesheet.timestamp
    .sort((a, b) => sortByClub(a, b, timesheetDay))
    .forEach((timestamp, index) => {
      const {
        datetime,
        student: { clubs, name }
      } = timestamp;

      if (
        timestamp[index + 1] &&
        clubByDay !==
          timestamp[index + 1].clubs.find(club => club.day === timesheetDay)
      ) {
        doc.text(clubName, spacing, spacing);
      }

      const clubByDay = clubs.find(club => club.day === timesheetDay);
      const clubName = clubByDay ? clubByDay.name : 'Drop In';

      const line = index % lines;

      addTimestampRow(doc, line, name, '', datetime, index);

      if (line === lines - 1) {
        doc.addPage();
        addTimesheetHeader();
      }

      if (line === lines - 1) {
        doc.addPage();
        addTimesheetHeader();
      }
    });
}

function clubNameByDay(clubs, day) {
  return clubs.find(club => club.day === day)
    ? clubs.find(club => club.day === day).name
    : 'Drop In';
}

function sortByName(a, b) {
  const nameA = a.student.name.toUpperCase();
  const nameB = b.student.name.toUpperCase();

  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;

  return 0;
}

function sortByClub(a, b, timesheetDay) {
  const clubNameA = clubNameByDay(a.student.clubs, timesheetDay);
  const clubNameB = clubNameByDay(b.student.clubs, timesheetDay);

  if (clubNameA < clubNameB) return -1;
  if (clubNameA > clubNameB) return 1;

  return 0;
}

function addTimestampRow(
  doc,
  line,
  timestampName,
  timestampClubName,
  timestampDatetime,
  index
) {
  addLine(doc, line);
  doc.text(
    format(timestampDatetime, 'h:mm a'),
    spacing,
    spacing * line + spacing * 3
  );
  doc.text(timestampName, 0.9, spacing * line + spacing * 3);
  doc.text(timestampClubName, 3.5, spacing * line + spacing * 3);
}

function addLine(doc, line) {
  doc.line(
    spacing,
    line * spacing + spacing * 2 + 0.25,
    8.5 - spacing,
    line * spacing + spacing * 2 + 0.25
  );
}
