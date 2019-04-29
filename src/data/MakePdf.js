import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { apiUrl } from 'config';
import { format } from 'date-fns';
import {
  addTimesheetHeader,
  studentSignInList,
  studentClassList
} from './PDFTemplate';

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

  const generateAllStudentsPdf = type => {
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

    addTimesheetHeader(doc, timesheet);
    // studentSignInList(doc, timesheet);
    studentClassList(doc, timesheet);

    doc.save('log.pdf');
    console.log('pdf made');

    function clubNameByDay(clubs, day) {
      return clubs.find(club => club.day === day)
        ? clubs.find(club => club.day === day).name
        : 'Drop In';
    }
  };

  return (
    <button
      className="p-2 mx-2 border rounded hover:bg-grey-lighter"
      onClick={generateAllStudentsPdf}
    >
      Print
    </button>
  );
}

export default MakePdf;
