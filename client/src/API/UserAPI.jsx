import axiosClient from './axiosClient';

const UserAPI = {
	getAllData: () => {
		const url = '/users';
		return axiosClient.get(url);
	},

	getDetailData: (id) => {
		const url = `/users/${id}`;
		return axiosClient.get(url);
	},
	postSignIn: (query) => {
		const url = `/users/signin/${query}`;
		return axiosClient.post(url);
	},

	postSignUp: (query) => {
		const url = `/users/signup/${query}`;
		return axiosClient.post(url);	
	},
	logout: ()=>{
		const url = '/users/logout';
		return axiosClient.post(url);	
	},
	changePassword: (query)=>{
		const url = `/users/change-password/${query}`;
		return axiosClient.post(url);	
	},
	forgotPassword: (query)=>{
		const url = `/users/forgot-password/${query}`;
		return axiosClient.post(url);	
	}
};

export default UserAPI;
