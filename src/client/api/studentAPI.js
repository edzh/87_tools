import { apiUrl } from 'config';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('id_token')}`
};

export async function getProgramStudents(programId) {
  const { data } = await fetch(`${apiUrl}/api/program/${programId}/students`, {
    headers: headers
  })
    .then(response => response.json())
    .then(json => json);

  return data;
}
