import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { apiUrl } from 'config';
import { format } from 'date-fns';
import {
  addTimesheetHeader,
  addColumnNames,
  studentSignInList,
  studentClassList
} from './PDFTemplate';

function MakePdf(props) {
  const [timesheet, setTimesheet] = useState([]);
  const [clubs, setClubs] = useState([]);
  const timesheetDay = parseInt(format(timesheet.date, 'E'));

  useEffect(() => {
    const fetchTimesheet = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/api/timesheet/${props.timesheetId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('id_token')}`
          }
        }
      )
        .then(response => response.json())
        .then(json => json.data);

      setTimesheet(result);
    };

    const fetchClubs = async () => {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/api/club`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('id_token')}`
        }
      })
        .then(response => response.json())
        .then(json => json.data);

      setClubs(result);
    };

    fetchTimesheet();
    fetchClubs();
  }, []);

  const generateAllStudentsPdf = type => {
    let doc = new jsPDF({
      orientation: 'p',
      unit: 'in',
      format: 'letter'
    });
    const spacing = 0.2;
    const lines = 52;

    // addColumnNames(doc, 1, timesheet);

    if (type === 'signin') {
      studentSignInList(doc, timesheet);
    }

    if (type === 'class') {
      studentClassList(doc, timesheet, clubs);
    }

    // doc.save(`${Date.now()}-log.pdf`);
    doc.output('dataurlnewwindow', 'log.pdf');

    function clubNameByDay(clubs, day) {
      return clubs.find(club => club.day === day)
        ? clubs.find(club => club.day === day).name
        : 'Drop In';
    }
  };

  return (
    <>
      <button
        className="p-2 mr-2 shadow border rounded hover:bg-grey-lighter"
        onClick={() => generateAllStudentsPdf('signin')}
      >
        Print Sign In
      </button>
      <button
        className="p-2 mx-2 shadow border rounded hover:bg-grey-lighter"
        onClick={() => generateAllStudentsPdf('class')}
      >
        Print Class
      </button>
    </>
  );
}

export default MakePdf;
