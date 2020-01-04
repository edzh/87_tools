const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('id_token')}`
};

export default headers;
