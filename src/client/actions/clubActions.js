import { apiUrl } from 'config';

function fetchClubsRequest() {
  return {
    type: 'FETCH_CLUBS_REQUEST'
  };
}

export function fetchCurrentClubRequest() {
  return {
    type: 'FETCH_CURRENT_CLUB_REQUEST'
  };
}

// get many
export function getClubs() {
  return dispatch => {
    dispatch(fetchClubsRequest());
    return fetch(`${process.env.REACT_APP_API_URL}/api/club`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(getClubsSuccess(json.data));
      })
      .catch(err => {
        dispatch(getClubsFailure(err));
      });
  };
}

function getClubsSuccess(clubs) {
  return {
    type: 'GET_CLUBS_SUCCESS',
    clubs
  };
}

function getClubsFailure(err) {
  return {
    type: 'GET_CLUBS_FAILURE',
    err
  };
}

// get one
export function getCurrentClub(clubId) {
  return dispatch => {
    dispatch(fetchCurrentClubRequest());
    return fetch(`${apiUrl}/api/club/${clubId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(getCurrentClubSuccess(json.data));
      });
  };
}

function getCurrentClubSuccess(club) {
  return {
    type: 'GET_CURRENT_CLUB_SUCCESS',
    club
  };
}

// create one
export function addClub(club) {
  return dispatch => {
    dispatch(fetchClubsRequest());
    return fetch(`${apiUrl}/api/club/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(club)
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Unable to create club!');
        }

        return response.json();
      })
      .then(json => {
        dispatch(addClubSuccess(json.data));
      });
  };
}

function addClubSuccess(club) {
  return {
    type: 'ADD_CLUB_SUCCESS',
    club
  };
}

// update one
export function updateClub(club) {
  return dispatch => {
    dispatch(fetchCurrentClubRequest());
    return fetch(`${apiUrl}/api/club/${club._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      },
      body: JSON.stringify(club)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(updateClubSuccess(club));
      });
  };
}

function updateClubSuccess(club) {
  return {
    type: 'UPDATE_CLUB_SUCCESS',
    club
  };
}

// delete one
export function deleteClub(clubId) {
  return dispatch => {
    dispatch(fetchClubsRequest());
    return fetch(`${apiUrl}/api/club/${clubId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(deleteClubSuccess(clubId));
      });
  };
}

function deleteClubSuccess(clubId) {
  return {
    type: 'DELETE_CLUB_SUCCESS',
    clubId
  };
}

function getClubStudentsSuccess(students) {
  return {
    type: 'GET_CLUB_STUDENTS_SUCCESS',
    students
  };
}

export function getClubStudents(clubId) {
  return dispatch => {
    dispatch(fetchCurrentClubRequest());
    return fetch(`${apiUrl}/api/club/${clubId}/students`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(getClubStudentsSuccess(json.data));
      });
  };
}
