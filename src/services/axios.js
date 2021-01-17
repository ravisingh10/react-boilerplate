import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/',
  timeout: 60000,
  // headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.response.use((response) => {
  if (response.status === 401) {
    console.log('Unauthorized request');
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
})


export default instance