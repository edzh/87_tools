import { schema } from 'normalizr';

export const family = new schema.Entity('families', undefined, {
  idAttribute: value => value._id
});
export const familyList = [family];

export const student = new schema.Entity('students', undefined, {
  idAttribute: value => value._id
});
export const studentList = [student];

export const session = new schema.Entity('sessions', undefined, {
  idAttribute: value => value._id
});

export const sessionList = [session];

export const program = new schema.Entity('program', undefined, {
  idAttribute: value => value._id
});

export const programList = [program];

export const club = new schema.Entity('clubs', undefined, {
  idAttribute: value => value._id
});

export const clubList = [club];

export const user = new schema.Entity('user', undefined, {
  idAttribute: value => value._id
});
