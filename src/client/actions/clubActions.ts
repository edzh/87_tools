import * as types from './clubTypes';
import { Club } from '../types/Club';
import { AppActions } from '../types/actions';
import { Dispatch } from 'redux';
import { AppState } from '../store/configureStore';

export const addClub = (club: Club): AppActions => ({
  type: 'ADD_CLUB',
  club
});

export const removeClub = (id: string): AppActions => ({
  type: 'REMOVE_CLUB',
  id
});

export const editClub = (club: Club): AppActions => ({
  type: 'EDIT_CLUB',
  club
});

export const setClubs = (clubs: Club[]): AppActions => ({
  type: 'SET_CLUBS',
  clubs
});

export const setClub = (club: Club): AppActions => ({
  type: 'SET_CLUB',
  club
});

export const startAddClub = (clubData: { name: string; day: number }) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const { name = '', day = 0 } = clubData;

    const club = { name, day };

    dispatch(
      addClub({
        ...club,
        students: [],
        start: new Date(0),
        end: new Date(0),
        capacity: 0,
        session: ''
      })
    );
  };
};

export const startRemoveClub = (id: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(removeClub(id));
  };
};

export const startEditClub = (club: Club) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(editClub(club));
  };
};

export const startSetClubs = (clubs: Club[]) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(setClubs(clubs));
  };
};

export const startSetClub = (club: Club) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(setClub(club));
  };
};

// function fetchClubsRequest() {
//   return {
//     type: types.FETCH_CLUBS_REQUEST
//   };
// }

// function fetchClubsSuccess(clubs: []) {
//   return {
//     type: types.FETCH_CLUBS_SUCCESS,
//     clubs
//   };
// }

// function fetchClubsFailure(err: {}) {
//   return {
//     type: types.FETCH_CLUBS_FAILURE,
//     err
//   };
// }

// export function fetchClubs() {
//   return (dispatch: Dispatch<IState>) => {
//     dispatch(fetchClubsRequest());
//     return fetch(`${process.env.REACT_APP_API_URL}/api/club`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('id_token')}`
//       }
//     })
//       .then(response => response.json())
//       .then(json => {
//         dispatch(fetchClubsSuccess(json.data));
//       })
//       .catch(err => {
//         dispatch(fetchClubsFailure(err));
//       });
//   };
// }
