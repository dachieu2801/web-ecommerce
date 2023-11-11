import axiosClient from './axiosClient';

const UserAPI = {
	getAllData: () => {
		const url = '/users/admin';
		return axiosClient.get(url);
	},
	getDetailData: (id) => {
		const url = `/users/admin/${id}`;
		return axiosClient.get(url);
	},
	postSignUp: (query) => {
		const url = `/users/signup/${query}`;
		return axiosClient.post(url);
	},
	postSignIn: (query) => {
		const url = `/users/signin/admin${query}`;
		return axiosClient.post(url);
	},
};

export default UserAPI;
