const initialFamiliesState = {
  isFetching: false,
  items: {
    byId: {},
    allIds: []
  },
  recentFamily: ''
};

const initialCurrentFamilyState = {
  isFetching: false,
  item: {
    byId: {},
    allIds: ''
  }
};

export function families(state = initialFamiliesState, action) {
  switch (action.type) {
    case 'FETCH_FAMILIES_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'FETCH_FAMILIES_SUCCESS':
      return {
        ...state,
        items: {
          ...state.items,
          byId: action.payload.byId,
          allIds: action.payload.allIds
        },
        isFetching: false
      };
    case 'ADD_FAMILY_SUCCESS':
      const families = state.items.byId;
      const familyIds = state.items.allIds;

      const { byId, allIds } = action.payload;

      return {
        ...state,
        items: {
          byId: {
            ...families,
            [allIds]: byId[allIds]
          },
          allIds: [...familyIds, allIds]
        },
        recentFamily: allIds,
        isFetching: false
      };
    case 'DELETE_FAMILY_SUCCESS':
      return {
        ...state,
        items: {
          byId: {
            ...state.items.byId,
            [action.payload.allIds]: null
          },
          allIds: state.items.allids.filter(
            studentId => studentId !== action.payload.allIds
          )
        }
      };
    default:
      return state;
  }
}

export function currentFamily(state = initialCurrentFamilyState, action) {
  switch (action.type) {
    case 'CURRENT_FAMILY_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'CURRENT_FAMILY_SUCCESS':
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
