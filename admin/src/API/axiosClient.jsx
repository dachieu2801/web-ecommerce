
// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
	baseURL: 'https://nodejs-assign3.onrender.com',
	// baseURL: 'http://localhost:5000/',

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

