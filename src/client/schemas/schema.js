import { schema } from 'normalizr';

export const student = new schema.Entity('students', undefined, {
  idAttribute: value => value._id
});
export const studentList = [student];

export const session = new schema.Entity('sessions', undefined, {
  idAttribute: value => value._id
});

export const sessionList = [session];
