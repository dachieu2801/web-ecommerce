import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import queryString from 'query-string';
import ProductAPI from '../API/ProductAPI';
import Pagination from './Component/Pagination';

function Products(props) {

	const [products, setProducts] = useState();
	const [reload, setReload] = useState();

	const [pagination, setPagination] = useState({
		page: '1',
		count: '8',
		search: '',
		category: 'all',
	});

	// const [search, setSearch] = useState('');

	const onChangeText = (e) => {
		const value = e.target.value;

		setPagination({
			page: pagination.page,
			count: pagination.count,
			search: value,
			category: pagination.category,
		});
	};

	//Tổng số trang
	const [totalPage, setTotalPage] = useState();

	//Hàm này dùng để thay đổi state pagination.page
	//Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
	const handlerChangePage = (value) => {
		console.log('Value: ', value);

		//Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
		setPagination({
			page: value,
			count: pagination.count,
			search: pagination.search,
			category: pagination.category,
		});
	};

	//Gọi hàm useEffect tìm tổng số sản phẩm để tính tổng số trang
	//Và nó phụ thuộc và state pagination
	useEffect(() => {
		const fetchAllData = async () => {
			//////////////////////////////////////////
			const response = await ProductAPI.getAPI();

			if (response.message) {
				console.log(response.message);
			} else {
				//Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang
				const totalPage = Math.ceil(
					parseInt(response.products.length) / parseInt(pagination.count)
				);
				setTotalPage(totalPage);
				//set lại page nếu xóa hết 1 qage
				if (pagination.page > totalPage) {
					setPagination({
						page: totalPage,
						count: pagination.count,
						search: pagination.search,
						category: pagination.category,
					});
				}
			}

		};

		fetchAllData();
	}, [pagination, reload]);

	//Gọi hàm Pagination
	useEffect(() => {
		const fetchData = async () => {
			const params = {
				page: pagination.page,
				count: pagination.count,
				search: pagination.search,
				category: pagination.category,
			};

			const query = queryString.stringify(params);

			const newQuery = '?' + query;

			const response = await ProductAPI.getPagination(newQuery);
			console.log(response);

			setProducts(response.results);
		};

		fetchData();
	}, [pagination, reload]);

	const deleteHandle = async (value) => {
		const confirm = window.confirm('Are you sure you want to delete this product')
		if (confirm) {
			const params = {
				id: value
			};
			const query = '?' + queryString.stringify(params);
			const response = await ProductAPI.deleteProduct(query);

			if (response.message === 'oke') {
				setReload(Math.random())
			} else {
				console.log(response);
			}
		}
	};


	return (

		<div className='card-body'>
			<h3 className='card-title'>Products</h3>
			<input
				style={{ marginBottom: 20 }}
				className='form-control w-25'
				onChange={onChangeText}
				type='text'
				placeholder='Enter Search!'
			/>
			<table className='table table-striped table-bordered no-wrap'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Price</th>
						<th>Image</th>
						<th>Category</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{products &&
						products.map((value) => (
							<tr key={value._id}>
								<td>{value._id}</td>
								<td>{value.name}</td>
								<td>{value.price}</td>
								<td>
									<img
										src={value.img1}
										style={{
											height: '60px',
											width: '60px',
										}}
										alt=''
									/>
								</td>
								<td>{value.category}</td>
								<td>
									<Link
										to={`/products/${value._id}`}
										style={{
											cursor: 'pointer',
											color: 'white',
										}}
										className='btn btn-success'>
										Update
									</Link>
									&nbsp;
									<span
										onClick={() => deleteHandle(value._id)}
										style={{
											cursor: 'pointer',
											color: 'white',
										}}
										className='btn btn-danger'>
										Delete
									</span>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<Pagination
				pagination={pagination}
				handlerChangePage={handlerChangePage}
				totalPage={totalPage}
			/>
		</div>
	);
}

export default Products;