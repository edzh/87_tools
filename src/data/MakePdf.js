import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { apiUrl } from 'config';
import { format } from 'date-fns';

function MakePdf(props) {
  const [timesheet, setTimesheet] = useState([]);
  const timesheetDay = parseInt(format(timesheet.date, 'E'));

  useEffect(() => {
    const fetchTimesheet = async () => {
      const result = await fetch(`${apiUrl}/api/timesheet/${props.timesheetId}`)
        .then(response => response.json())
        .then(json => json.data);

      setTimesheet(result);
    };

    fetchTimesheet();
  }, []);

  const generatePdf = () => {
    let doc = new jsPDF({
      orientation: 'p',
      unit: 'in',
      format: 'letter'
    });
    const spacing = 0.2;
    const lines = 52;

    doc.setFontSize(10);
    doc.setFillColor(0.2);
    doc.setTextColor(0.5);

    addHeader();

    timesheet.timestamp
      .sort((a, b) => {
        const nameA = a.student.name.toUpperCase();
        const nameB = b.student.name.toUpperCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        return 0;
      })
      .sort((a, b) => {
        const clubNameA = clubNameByDay(a.student.clubs, timesheetDay);
        const clubNameB = clubNameByDay(b.student.clubs, timesheetDay);

        if (clubNameA < clubNameB) return -1;
        if (clubNameA > clubNameB) return 1;

        return 0;
      })
      .forEach((timestamp, index) => {
        console.log(timestamp);
        const {
          datetime,
          student: { clubs, name }
        } = timestamp;

        const clubByDay = clubs.find(club => club.day === timesheetDay);
        const clubName = clubByDay ? clubByDay.name : 'Drop In';

        const line = index % lines;

        addTimestampRow(
          name,
          clubNameByDay(clubs, timesheetDay),
          datetime,
          index
        );

        if (line === lines - 1) {
          doc.addPage();
          addHeader();
        }

        function addTimestampRow(
          timestampName,
          timestampClubName,
          timestampDatetime,
          index
        ) {
          doc.line(
            spacing,
            line * spacing + spacing * 2 + 0.25,
            8.5 - spacing,
            line * spacing + spacing * 2 + 0.25
          );
          doc.text(
            format(timestampDatetime, 'h:mm a'),
            spacing,
            spacing * line + spacing * 3
          );
          doc.text(timestampName, 0.9, spacing * line + spacing * 3);
          doc.text(timestampClubName, 3.5, spacing * line + spacing * 3);
        }
      });

    doc.save('log.pdf');
    console.log('pdf made');

    function addHeader() {
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

    function clubNameByDay(clubs, day) {
      return clubs.find(club => club.day === day)
        ? clubs.find(club => club.day === day).name
        : 'Drop In';
    }
  };

  // insertHeader(doc) {
  //   doc.text('Name', 10, 10);
  //   doc.text('Club', 100, 10);
  // }
  return <button onClick={generatePdf}>Print</button>;
}

export default MakePdf;
