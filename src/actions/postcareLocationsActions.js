export const ADD_CHILD_TO_LIBRARY = 'ADD_CHILD_TO_LIBRARY';
export const REMOVE_CHILD_FROM_LIBRARY = 'REMOVE_CHILD_FROM_LIBRARY';

export const ADD_CHILD_TO_GYM = 'ADD_CHILD_TO_GYM';
export const REMOVE_CHILD_FROM_GYM = 'REMOVE_CHILD_FROM_GYM';

export function addChildToLibrary(child) {
  return {
    type: ADD_CHILD_TO_LIBRARY,
    child
  };
}

export function removeChildFromLibrary(child) {
  return {
    type: REMOVE_CHILD_FROM_LIBRARY,
    child
  };
}
