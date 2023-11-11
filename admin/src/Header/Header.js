import React from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header(props) {
	const role = props.role
	const navigate = useNavigate()
	const { user } = useContext(AuthContext);
	const { dispatch } = useContext(AuthContext);

	const handleLogout = () => {
		if (user) {
			dispatch({ type: "LOGIN_SUCCESS", payload: null });
			localStorage.clear();
			navigate('/login')
		} else {
			navigate('/login')
		}
	}

	const clickChatHandle = () => {
		if (role !== 'counselors' && role !== 'admin') {
			alert("Please signin to use 😒")
			navigate(`/login`)
		}
		if (role === 'counselors' || role === 'admin') {
			navigate(`/chat`)
		}
	}


	return (
		<header className='topbar' data-navbarbg='skin6'>
			<nav className='navbar top-navbar navbar-expand-md'>
				<div className='navbar-header navbar-brand' data-logobg='skin6'>
					<div className='navbar-brand'>
						<Link to='/'>
							<span className='logo-text'>
								<span>Admin Page</span>
							</span>
						</Link>
					</div>
				</div>
				<ul className='navbar-nav float-left mr-auto ml-3 pl-1'>
					<li >
						<span
							style={{ cursor: 'pointer', marginLeft: 270 }}
							className='sidebar-link sidebar-link'
							onClick={clickChatHandle}
						>
							<span className='hide-menu'>Chat</span>
						</span>
					</li>
				</ul>
				<ul className='navbar-nav'>
					<li >
						<div
							className='nav-link dropdown-toggle'
							data-toggle='dropdown'
							aria-haspopup='true'
							aria-expanded='false'>
							<span className='ml-2 d-none d-lg-inline-block'>
								<span>Hello,</span>{' '}
								<span className='text-dark'>{user ? user.fullname : ''}</span>{' '}
								<i
									className='svg-icon'></i>
							</span>
							<span
								style={{ marginLeft: 24, marginRight: 12 }}
								onClick={handleLogout}>
								<i
									className='svg-icon mr-2 ml-1'></i>
								{user ? '(Logout)' : 'Login'}
							</span>
						</div>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
