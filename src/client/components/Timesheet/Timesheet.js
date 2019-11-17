import React, { useEffect } from 'react';

import TimesheetList from './TimesheetList';
import TimesheetForm from './TimesheetForm';

export default function Timesheet({
  sessionId,
  timesheets,
  addTimesheet,
  getSessionTimesheets,
  currentSession
}) {
  useEffect(() => {
    getSessionTimesheets(sessionId);
  }, []);

  return (
    <div className="flex mt-2">
      <TimesheetList timesheets={timesheets} />
      <TimesheetForm
        addTimesheet={addTimesheet}
        currentSession={currentSession}
      />
    </div>
  );
}
