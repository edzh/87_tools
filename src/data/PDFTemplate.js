import jsPDF from 'jspdf';
import { format } from 'date-fns';

const margin = {
  top: 0.5,
  left: 0.5,
  bottom: 0.5,
  right: 0.5,
  width: 7.5
};

const headerOffset = 0.5 + margin.top;
const lineOffset = 0.075;
const column = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8];

const spacing = 0.33;
const lines = Math.floor(10.5 / spacing - headerOffset / spacing);

export function addTimesheetHeader(doc, timesheet) {
  doc.setFontSize(14);
  doc.setTextColor(0.5);
  doc.setLineWidth(0.005);

  doc.text(
    `${timesheet.io === 'in' ? 'Signed in' : 'Signed out'} sheet for ${format(
      timesheet.date,
      'MMMM DD, YYYY'
    )}`,
    margin.left,
    margin.top
  );
  doc.text('87 Afterschool', margin.width + margin.right, margin.top, {
    align: 'right'
  });
}

export function addColumnNames(doc, line, timesheet) {
  doc.text('Time', spacing, spacing * (2 + line));
  doc.text('Name', 0.9, spacing * (2 + line));
  doc.text('Club', 3.5, spacing * (2 + line));
  doc.line(
    spacing,
    (line + 1.25) * spacing,
    8.5 - spacing,
    (line + 1.25) * spacing,
    'S'
  );
  doc.line(
    spacing,
    (line + 2.25) * spacing,
    8.5 - spacing,
    (line + 2.25) * spacing,
    'S'
  );
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

      // Add header if new page.
      if (line === 0) {
        //If first page don't add page
        if (index !== 0) {
          doc.addPage();
        }
        addTimesheetHeader(doc, timesheet);
        doc.setFontSize(12);

        doc.setFontStyle('bold');
        doc.text('Name', column[0], spacing * line + headerOffset);
        doc.text('Club', column[5], spacing * line + headerOffset);
        doc.text('Time', column[14], spacing * line + headerOffset, {
          align: 'left'
        });

        doc.setFontSize(10);
        doc.setFontStyle('normal');
      }

      doc.text(name, column[0], spacing * (line + 1) + headerOffset); //Name
      doc.text(clubName, column[5], spacing * (line + 1) + headerOffset); //Club
      doc.text(
        format(datetime, 'h:mm a'),
        column[15],
        spacing * (line + 1) + headerOffset,
        { align: 'right' }
      ); //Time

      addLine(doc, line);
    });
}

export function studentClassList(doc, timesheet) {
  const timesheetDay = parseInt(format(timesheet.date, 'E'));
  let row = 1;
  timesheet.timestamp
    .sort((a, b) => sortByClub(a, b, timesheetDay))
    .forEach((timestamp, index) => {
      const {
        datetime,
        student: { clubs, name }
      } = timestamp;
      const clubByDay = clubs.find(club => club.day === timesheetDay);
      const nextClubByDay = timesheet.timestamp[index + 1]
        ? timesheet.timestamp[index + 1].student.clubs.find(
            club => club.day === timesheetDay
          )
        : undefined;
      const clubName = clubByDay ? clubByDay.name : 'Drop In';
      const nextClubName = nextClubByDay ? nextClubByDay.name : 'Drop In';

      if (clubName !== nextClubName) {
        doc.text(clubName, spacing, spacing * 2);
        doc.addPage();
        addTimesheetHeader(doc, timesheet);
        addColumnNames(doc, 1, timesheet);
        row = 0;
      }

      if (row === lines - 1) {
        doc.addPage();
        row = 1;
        addTimesheetHeader(doc, timesheet);
        addColumnNames(doc, 1, timesheet);
      }

      row++;
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

function addLine(doc, line) {
  doc.line(
    margin.left,
    spacing * line + lineOffset + headerOffset,
    margin.left + margin.width,
    spacing * line + lineOffset + headerOffset
  );
}

/*
FSO
Figure out who manually signs out or doesnt have a fob
Class lists add kids who aren't here as well
*/
