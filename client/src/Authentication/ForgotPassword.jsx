import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../API/UserAPI';
import './Auth.css';
import queryString from 'query-string';

function SignIn(props) {
	const navigate = useNavigate()

	//listCart được lấy từ redux

	const [email, setEmail] = useState('');


	const [error, setError] = useState('');

	const onSubmit = () => {
		if(email){
			setError('')
			const fetchChangePass = async () => {
				const params = {
					email,
				};
				const query = '?' + queryString.stringify(params);
				const response = await UserAPI.forgotPassword(query);
					if(response.message){
						setError(response.message);
					} 
					if(response.status==='oke'){
						alert('Please check your email')
					}
			};
			fetchChangePass();
		} else{
			setError('Enter all your fields');
		}
	};

	return (
		<div className='limiter'>
			<div className='container-login100'>
				<div className='wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50'>
					<span className='login100-form-title p-b-33'>Change Password</span>

					<div className='d-flex justify-content-center pb-4'>
				
						{error && (
							<span className='text-danger'>
								 {error}
							</span>
						)}
					
					</div>

						<label>Your email </label>
					<div className='wrap-input100 validate-input'>
						<input
							className='input100'
							type='text'
							placeholder='Email'
							value={email}
							onChange={(e)=> setEmail(e.target.value.trim())}
						/>
					</div>

					<div className='container-login100-form-btn m-t-20 pb-5'>
						<button className='login100-form-btn' onClick={onSubmit}>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
