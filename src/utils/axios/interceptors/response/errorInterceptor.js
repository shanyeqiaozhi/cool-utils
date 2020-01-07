import axios from 'axios';

axios.interceptors.response.use(function (response) {
  const {
    config: {
      options: { parseResponse, correctErrorCode },
    },
  } = response;
  const { errorCode, errCode, errorMsg, errMsg } = parseResponse(response);
  const eCode = errorCode || errCode || 0;
  if (!eCode || eCode === correctErrorCode) {
    return response;
  }
  const eMsg = errorMsg || errMsg || 'Default no defined error message!';
  return Promise.reject(new Error(eMsg));
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});