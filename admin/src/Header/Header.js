import React from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import admin from '../assets/images/Untitled.png'

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
		<header className='mt-2	border-bottom' >
			<nav className='row	'>
				<Link className='col-2 ps-5 ' style={{ borderRight: '1px solid #ccc' }} to='/'>
					<img src={admin} alt='Admin Page' width='100%' />
				</Link>
				<li className='col-8 mt-3 ps-4 '>
					<button style={{ border: 'none', background: '#fff', fontSize: '28px' }} onClick={clickChatHandle} className='hide-menu'>Chat</button>
				</li>
				<li className='col-2 mt-4 h5'>
					<span>Hello, </span>
					<span className='text-dark pe-3'>{user ? user.fullname : ''}</span>
					<button
						style={{  border: 'none', background: '#fff' }}
						onClick={handleLogout}>
						{user ? '(Logout)' : 'Login'}
					</button>
				</li>
			</nav>
		</header>
	);
}

export default Header;
