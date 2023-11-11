
// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
	baseURL: 'https://nodejs-assign3.onrender.com',
	// headers: {
	// 	'content-type': 'application/json',	
	// 	'Authorization': localStorage.getItem('token_user') || null,
	// },
	paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
	config.headers={
		'content-type': 'application/json',	
	  'Authorization': localStorage.getItem('token_user')}
	// Handle token here ...
	return config;
});
axiosClient.interceptors.response.use(
	(response) => {
		return response.data;
	}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
		if(error.message !== 'Request failed with status code 404'){
		  
			return error.response.data
		}
  }
);
export default axiosClient;



// {
// 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNiN2JhZDMyMGFiYTI3NjcwNDAzNDUiLCJuYW1lIjoiaGlldSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2OTg1NjM2NDYsImV4cCI6MTY5ODY1MDA0Nn0.AIa3g6g0hYKCtgUZpdgJ53zf_gYDg2m8IpB-xeR3XUg",
// 	"id": "653b7bad320aba2767040345",
// 	"fullname": "hieu"
// }