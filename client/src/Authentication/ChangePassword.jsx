import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../API/UserAPI';
import './Auth.css';
import queryString from 'query-string';

function SignIn(props) {
	const navigate = useNavigate()

	//listCart được lấy từ redux

	const [currentPassword, setCurrentPassword] = useState('');

	const [newPassWord, setNewPassWord] = useState('');

	const [error, setError] = useState('');

	const onSubmit = () => {
		if(currentPassword && newPassWord){
			setError('')
			const fetchChangePass = async () => {
				const params = {
					idUser: localStorage.getItem('id_user'),
					currentPassword,
					newPassWord
				};
				const query = '?' + queryString.stringify(params);
				const response = await UserAPI.changePassword(query);
					if(response.message){
						setError(response.message);
					} 
					if(response.status==='oke'){
						alert('Success')
						navigate('/');
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

					<div className='d-flex justify-content-center pb-5'>
				
						{error && (
							<span className='text-danger'>
								 {error}
							</span>
						)}
					
					</div>

					<div className='wrap-input100 validate-input'>
						<input
							className='input100'
							type='password'
							placeholder='currentPass'
							value={currentPassword}
							onChange={(e)=> setCurrentPassword(e.target.value.trim())}
						/>
					</div>

					<div className='wrap-input100 rs1 validate-input'>
						<input
							className='input100'
							type='password'
							placeholder='newPassword'
							value={newPassWord}
							onChange={(e)=> setNewPassWord(e.target.value.trim())}
						/>
					</div>

					<div className='container-login100-form-btn m-t-20'>
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
