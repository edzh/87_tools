// const env = process.env.NODE_ENV || 'production';

// let apiUrl = '';

// switch (env) {
//   case 'development':
//     apiUrl = 'http://localhost:3001';
//   case 'production':
//     apiUrl = '';
//   default:
//     apiUrl = 'http://localhost:3001';
// }

// export const apiUrl = 'http://localhost:3001';
// export const apiUrl = `http://10.5.7.5:3001`;
// export const apiUrl = `http://192.168.1.113:3001`;
export const apiUrl = process.env.REACT_APP_API_URL;
