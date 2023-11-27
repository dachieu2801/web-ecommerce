import { useNavigate } from "react-router-dom"
function Menu(props) {
	const role = props.role
	const navigate = useNavigate()

	const clickHandle = (a) => {
		if (role === 'admin') {
			navigate(`/${a}`)
		} else if (role === 'counselors') {
			alert("You cannot use this feature 😒")
			navigate(`/`)
		} else {
			alert("You cannot use this feature 😒")
			navigate(`/login`)
		}
	}
	return (
		<aside className='h5 mt-4 ' >
			<ul >
				<li className=' mb-3'>
					<span style={{ cursor: 'pointer' }}
						onClick={() => clickHandle('history')}
						className='sidebar-link'>
						<span className='hide-menu'>
							History
						</span>
					</span>
				</li>
				<li className=' mb-3'>
					<span
						style={{ cursor: 'pointer' }}
						onClick={() => clickHandle('users')}
						className='sidebar-link'>
						<span className='hide-menu'>
							Users
						</span>
					</span>
				</li>

				<li className=' mb-3'>
					<span
						style={{ cursor: 'pointer' }}
						onClick={() => clickHandle('products')}
						className='sidebar-link'>
						<span className='hide-menu'>
							Products
						</span>
					</span>
				</li>
				<li >
					<span
						style={{ cursor: 'pointer' }}

						onClick={() => clickHandle('new')}
					>
						<span className='hide-menu'>New Product</span>
					</span>
				</li>
			</ul>
		</aside>
	);
}

export default Menu;
