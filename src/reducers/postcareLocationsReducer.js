import {
  ADD_STUDENT_TO_LIBRARY,
  REMOVE_STUDENT_FROM_LIBRARY,
  ADD_STUDENT_TO_GYM,
  REMOVE_STUDENT_FROM_GYM
} from '../actions/postcareLocationsActions';

const initialState = {
  library: [],
  gym: []
};

export default function postcareLocations(state = initialState, action) {
  switch (action.type) {
    case ADD_STUDENT_TO_LIBRARY:
      return {
        ...state,
        library: [
          ...state.library,
          {
            name: action.student.name,
            grade: action.student.grade,
            pin: action.student.pin,
            present: true
          }
        ]
      };
    case REMOVE_STUDENT_FROM_LIBRARY:
      return {
        ...state,
        library: state.library.map(student => {
          if (student.name === action.student.name) {
            return {
              ...student,
              present: !student.present
            };
          }
          return student;
        })
      };

    case ADD_STUDENT_TO_GYM:
      return {
        ...state,
        gym: [
          ...state.gym,
          {
            name: action.student.name,
            grade: action.student.grade,
            pin: action.student.pin,
            present: true
          }
        ]
      };
    case REMOVE_STUDENT_FROM_GYM:
      return {
        ...state,
        gym: state.gym.map(student => {
          if (student.name === action.student.name) {
            return {
              ...student,
              present: !student.present
            };
          }
          return student;
        })
      };
    default:
      return state;
  }
}
