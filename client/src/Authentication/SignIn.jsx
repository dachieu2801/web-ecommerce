import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import UserAPI from '../API/UserAPI';
import { addSession } from '../Redux/Action/ActionSession';
import './Auth.css';
import queryString from 'query-string';

function SignIn(props) {
	const navigate = useNavigate()

	//listCart được lấy từ redux
	const listCart = useSelector((state) => state.Cart.listCart);

	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');

	const [error, setError] = useState(false);

	const [checkPush, setCheckPush] = useState(false);

	const dispatch = useDispatch();

	const onChangeEmail = (e) => {
		setEmail(e.target.value.trim());
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value.trim());
	};

	const onSubmit = () => {
	
		const fetchSignUp = async () => {
			const params = {
				email,
				password
			};
			const query = '?' + queryString.stringify(params);
			const response = await UserAPI.postSignIn(query);
		
			if(!response.message){
				localStorage.setItem('id_user', response.id);
				localStorage.setItem('name_user', response.fullname);
				localStorage.setItem('token_user', response.token);

				const action = addSession(localStorage.getItem('id_user'));
				dispatch(action);	
				setCheckPush(true);
				navigate('/')
			} else{
				setError(response.message);
			}
		};

		fetchSignUp();
	};

	return (
		<div className='limiter'>
			<div className='container-login100'>
				<div className='wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50'>
					<span className='login100-form-title p-b-33'>Sign In</span>

					<div className='d-flex justify-content-center pb-5'>
				
						{error && (
							<span className='text-danger'>
								 Email or Password Incorrect
							</span>
						)}
					
					</div>

					<div className='wrap-input100 validate-input'>
						<input
							className='input100'
							type='text'
							placeholder='Email'
							value={email}
							onChange={onChangeEmail}
						/>
					</div>

					<div className='wrap-input100 rs1 validate-input'>
						<input
							className='input100'
							type='password'
							placeholder='Password'
							value={password}
							onChange={onChangePassword}
						/>
					</div>

					<div className='container-login100-form-btn m-t-20'>
						<button className='login100-form-btn' onClick={onSubmit}>
							Sign in
						</button>
					</div>

					<div className='text-center p-t-45 p-b-4'>
						<span className='txt1'>Create an account?</span>
						&nbsp;
						<Link to='/signup' className='txt2 hov1'>
							Sign up
						</Link>
					</div>
					<div className='text-center '>
						<span className='txt1'>Forgot password? </span>
						<Link to='/forgot-password' className='txt2 hov1'>
							Click
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
