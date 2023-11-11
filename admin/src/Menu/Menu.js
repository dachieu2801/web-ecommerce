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
		<aside className='left-sidebar' data-sidebarbg='skin6'>
			<div className='scroll-sidebar' data-sidebarbg='skin6'>
				<nav className='sidebar-nav'>
					<ul id='sidebarnav'>
						<li className='sidebar-item'>
							<span style={{ cursor: 'pointer' }}
								className='sidebar-link'
								onClick={() => clickHandle('')}>
								<i className='feather-icon'></i>
								<span className='hide-menu'>Dashboard</span>
							</span>
						</li>

						<li className='nav-small-cap'>
							<span className='hide-menu'>Components</span>
						</li>
						<li className='sidebar-item'>
							<span style={{ cursor: 'pointer' }}
								onClick={() => clickHandle('history')}
								className='sidebar-link'>
								<i
									className='feather-icon'></i>
								<span className='hide-menu'>
									History
								</span>
							</span>
						</li>
						<li className='sidebar-item'>
							<span
								style={{ cursor: 'pointer' }}
								onClick={() => clickHandle('users')}
								className='sidebar-link'>
								<i
									className='feather-icon'></i>
								<span className='hide-menu'>
									Users
								</span>
							</span>
						</li>

						<li className='sidebar-item'>
							<span
								style={{ cursor: 'pointer' }}
								onClick={() => clickHandle('products')}
								className='sidebar-link'>
								<i
									className='feather-icon'></i>
								<span className='hide-menu'>
									Products
								</span>
							</span>
						</li>
						<li className='sidebar-item'>
							<span
								style={{ cursor: 'pointer' }}
								className='sidebar-link sidebar-link'
								onClick={() => clickHandle('new')}
							>
								<i
									className='feather-icon'></i>
								<span className='hide-menu'>New Product</span>
							</span>
						</li>

					</ul>
				</nav>
			</div>
		</aside>
	);
}

export default Menu;
