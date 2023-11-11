import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../API/UserAPI';
import { AuthContext } from '../Context/AuthContext';
import queryString from 'query-string';

import './Login.css';

const Login = (props) => {


	const setRole = props.setRole
	const navigate = useNavigate()
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState();
	const { dispatch } = useContext(AuthContext);


	const onSubmit = () => {

		const fetchSignUp = async () => {
			const params = {
				email,
				password
			};
			const query = '?' + queryString.stringify(params);
			const response = await UserAPI.postSignIn(query);
			console.log(response);
			if (!response.message) {
				dispatch({ type: 'LOGIN_SUCCESS', payload: { fullname: response.fullname, id: response.id } })
				localStorage.setItem('token_user', response.token);
				setRole(response.role)
				localStorage.setItem('role', response.role);

				navigate('/')
			} else {
				setError(response.message);
			}
		};

		fetchSignUp();
	};


	return (
		<div style={{ marginTop: 140 }} class='login'>
			<div class='heading'>
				<h2>Sign in</h2>
				{error && <p>{error}</p>}
				<form action='#'>
					<div className='input-group input-group-lg'>
						<span className='input-group-addon'>
							<i className='fa fa-user'></i>
						</span>
						<input
							type='text'
							className='form-control'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value.trim())}
						/>
					</div>

					<div className='input-group input-group-lg'>
						<span className='input-group-addon'>
							<i className='fa fa-lock'></i>
						</span>
						<input
							type='password'
							className='form-control'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value.trim())}
						/>
					</div>

					<button
						type='button'
						className='float'
						onClick={onSubmit}>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
