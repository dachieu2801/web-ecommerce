import axiosClient from './axiosClient';

const ProductAPI = {
	getAPI: () => {
		const url = '/products/admin';
		return axiosClient.get(url);
	},

	getCategory: (query) => {
		const url = `/products/admin/category${query}`;
		return axiosClient.get(url);
	},

	getDetail: (id) => {
		const url = `/products/admin/${id}`;
		return axiosClient.get(url);
	},
	editProduct: (query) => {
		const url = `products/admin/edit${query}`;
		return axiosClient.put(url);
	},
	createProduct: (query) => {
		const url = `products/admin/create${query}`;
		return axiosClient.post(url);
	},
	deleteProduct: (query) => {
		const url = `products/admin/delete${query}`;
		return axiosClient.delete(url);
	},
	getPagination: (query) => {
		const url = `/products/admin/pagination${query}`;
		return axiosClient.get(url);
	},
};

export default ProductAPI;
