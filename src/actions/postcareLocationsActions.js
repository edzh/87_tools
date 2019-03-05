export const ADD_STUDENT_TO_LIBRARY = 'ADD_STUDENT_TO_LIBRARY';
export const REMOVE_STUDENT_FROM_LIBRARY = 'REMOVE_STUDENT_FROM_LIBRARY';

export const ADD_STUDENT_TO_GYM = 'ADD_STUDENT_TO_GYM';
export const REMOVE_STUDENT_FROM_GYM = 'REMOVE_STUDENT_FROM_GYM';

export function addStudentToLibrary(student) {
  return {
    type: ADD_STUDENT_TO_LIBRARY,
    student
  };
}

export function removeStudentFromLibrary(student) {
  return {
    type: REMOVE_STUDENT_FROM_LIBRARY,
    student
  };
}

export function addStudentToGym(student) {
  return {
    type: ADD_STUDENT_TO_GYM,
    student
  };
}

export function removeStudentFromGym(student) {
  return {
    type: REMOVE_STUDENT_FROM_GYM,
    student
  };
}
