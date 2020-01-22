import * as types from '../actions/studentTypes';

const initialStudentsState = {
  items: {
    byId: {},
    allIds: []
  },
  isFetching: false
};

const initialCurrentStudentState = {
  item: {
    byId: {},
    allIds: ''
  },
  isFetching: false
};

export function students(state = initialStudentsState, action) {
  switch (action.type) {
    case types.FETCH_STUDENTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        items: {
          byId: action.payload.byId,
          allIds: action.payload.allIds
        },
        isFetching: false
      };
    case types.FETCH_STUDENTS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case 'ADD_STUDENT_SUCCESS':
      const students = state.items.byId;
      const studentIds = state.items.allIds;

      const { byId, allIds } = action.payload;

      return {
        ...state,
        items: {
          byId: {
            ...students,
            [allIds]: byId[allIds]
          },
          allIds: [...studentIds, allIds]
        },
        recentStudent: allIds,
        isFetching: false
      };
    case 'DELETE_STUDENT_SUCCESS':
      return {
        ...state,
        items: {
          byId: {
            ...state.items.byId,
            [action.payload.allIds]: null
          },
          allIds: state.items.allIds.filter(
            studentId => studentId !== action.payload.allIds
          )
        }
      };
    case 'STUDENT_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function currentStudent(state = initialCurrentStudentState, action) {
  switch (action.type) {
    case 'CURRENT_STUDENT_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'CURRENT_STUDENT_SUCCESS':
      return {
        isFetching: false,
        item: {
          byId: action.payload.byId,
          allIds: action.payload.allIds
        }
      };
    default:
      return state;
  }
}
