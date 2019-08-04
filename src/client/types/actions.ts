import { Club } from './Club';

export const ADD_CLUB = 'ADD_CLUB';
export const EDIT_CLUB = 'EDIT_CLUB';
export const REMOVE_CLUB = 'REMOVE_CLUB';
export const SET_CLUBS = 'SET_CLUBS';
export const SET_CLUB = 'SET_CLUB';

export interface SetClubsAction {
  type: typeof SET_CLUBS;
  clubs: Club[];
}

export interface SetClubAction {
  type: typeof SET_CLUB;
  club: Club;
}

export interface EditClubAction {
  type: typeof EDIT_CLUB;
  club: Club;
}

export interface RemoveClubAction {
  type: typeof REMOVE_CLUB;
  id: string;
}

export interface AddClubAction {
  type: typeof ADD_CLUB;
  club: Club;
}

export type ClubActionTypes =
  | SetClubsAction
  | SetClubAction
  | EditClubAction
  | RemoveClubAction
  | AddClubAction;

export type AppActions = ClubActionTypes;
