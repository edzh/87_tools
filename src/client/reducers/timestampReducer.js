const initialState = {
  isFetching: false
};

export default function timestamps(state = initialState, action) {
  switch (action.type) {
    case 'GET_TIMESHEET_TIMESTAMPS_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'GET_TIMESHEET_TIMESTAMPS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        items: action.timestamps
      };
    case 'ADD_TIMESTAMP_SUCCESS':
      return {
        ...state,
        isFetching: false,
        items: [...state.items, action.timestamp]
      };
    default:
      return state;
  }
}
