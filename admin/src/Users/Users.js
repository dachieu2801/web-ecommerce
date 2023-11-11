import React, { useEffect, useState } from 'react';
import UserAPI from '../API/UserAPI';
import { Link } from 'react-router-dom';

function Users(props) {

	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await UserAPI.getAllData();
			console.log(response);
			if (response.message === 'Invalid Token') {
				alert('You can\'t use this feature')
			} else {

				setUsers(response);
			}
		};
		fetchData();
	}, []);




	return (
		< div className='card-body' >
			<h3 className='card-title'>Users</h3>
			<table className='table table-striped table-bordered'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Fullname</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Role</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users.map((value) => (
							<tr key={value._id}>
								<td>{value._id}</td>
								<td>{value.fullname}</td>
								<td>{value.email}</td>
								<td>{value.phone}</td>
								<td style={{ color: value.role === 'admin' ? 'red' : null }}>{value.role}</td>
								<td>
									<Link to={`/users/admin/${value._id}`}
										style={{
											cursor: 'pointer',
											color: 'white',
										}}
										className='btn btn-success'>
										Update
									</Link>
									&nbsp;
									<span
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
		</div >

	);
}

export default Users;
