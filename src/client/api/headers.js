// Any routes beginning with user/ must have the
// object definition placed instead of the variable itself.
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('id_token')}`
};

export default headers;
