import { useEffect, useState } from 'react';
import HistoryAPI from '../API/HistoryAPI';

// Home.propTypes = {};

function Home() {
	const [history, setHistory] = useState();

	useEffect(() => {
		const fetchHistory = async () => {
			const response = await HistoryAPI.getAll();
			if (response.message === 'Invalid Token') {
			} else {
				setHistory(response.orders);
			}
		}
		fetchHistory()
	}, []);


	return (

		< div className='card-body' >
			<h3 className='card-title'>History</h3>
			<br />
			<div className='table-responsive'>
				<table className='table table-striped table-bordered no-wrap'>
					<thead>
						<tr>
							<th>ID User</th>
							<th>Name</th>
							<th>Phone</th>
							<th>Address</th>
							<th>Total</th>
							<th>Delivery</th>
							<th>Status</th>
							<th>Detail</th>
						</tr>
					</thead>
					<tbody>
						{history &&
							history.map((value) => (
								<tr key={value._id}>
									<td>{value.user.id}</td>
									<td>{value.user.fullname}</td>
									<td>{value.user.phone}</td>
									<td>{value.user.address}</td>
									<td>{value.total}</td>
									<td>Chưa Vận Chuyển</td>
									<td>Chưa Thanh Toán</td>
									<td>
										<span
											style={{
												cursor: 'pointer',
												color: 'white',
											}}
											className='btn btn-success'>
											View
										</span>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div >
	);
}

export default Home;
