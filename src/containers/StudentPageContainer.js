import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { setStudent } from '../actions/studentActions';

const intToGrade = ['K', '1st', '2nd', '3rd', '4th', '5th'];

function StudentPage(props) {
  const [student, setStudent] = useState(null);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    props.setStudent(props.student);

    fetch(`http://localhost:3001/api/student/${props.student}`)
      .then(response => response.json())
      .then(json => setStudent(json.data));
  }, []);

  if (!student) {
    return null;
  }

  return (
    <div>
      <ul>
        <li>{student.name}</li>
        <li>{intToGrade[student.grade]}</li>
        {student.family && (
          <div>
            <li>{student.family.name}</li>
            <li>
              Pickups
              {student.family.pickups.map(pickup => (
                <ul>
                  <li>{pickup.name}</li>
                  <li>{pickup.pin}</li>
                </ul>
              ))}
            </li>
          </div>
        )}
        <li>
          Clubs
          {student.clubs
            .sort((a, b) => a.day - b.day)
            .map(club => (
              <ul>
                <li>{club.name}</li>
                <li>{club.day}</li>
              </ul>
            ))}
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    student: ownProps.student
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStudent: student => {
      dispatch(setStudent(student));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentPage);
