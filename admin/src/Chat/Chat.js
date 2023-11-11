import { useEffect, useState, useRef } from 'react';
// import UserAPI from '../API/UserAPI';
import ChatRoomsAPI from '../API/ChatRoomsAPI';
import './Chat.css';

import io from 'socket.io-client';
const socket = io('https://nodejs-assign3.onrender.com', { transports: ['websocket'] });

function Chat(props) {


	const messagesEnd = useRef();
	const [allRoom, setAllRoom] = useState([]);
	const [refRoom, setRefRoom] = useState(false);
	const [roomId, setRoomId] = useState('');
	const [message, setMessage] = useState([]);
	const [load, setLoad] = useState(false);
	const [textMessage, setTextMessage] = useState('');
	const onChangeText = (e) => {
		setTextMessage(e.target.value);
	};

	// Hàm này dùng để tìm ra những user khác với admin
	useEffect(() => {
		const fetchData = async () => {
			const result = await ChatRoomsAPI.getAllRoom();
			setAllRoom(result.chatRooms);
		};
		fetchData();

		setRefRoom(false)
	}, [refRoom]);

	// Hàm này dùng để load dữ liệu message và nó sẽ chạy lại khi state id_user2 thay đổi
	// Tức là khi admin chọn người dùng mà admin muốn chat thì state id_user2 sẽ thay đổi
	// để gọi lại hàm này

	useEffect(() => {
		if (roomId) {
			const fetchData = async () => {
				/////////////////////////////////////////////////////////////////////////
				const result = await ChatRoomsAPI.getMessageByRoomId(roomId);
				setMessage(result.text || []);
			};
			fetchData();
			setTimeout(() => { messagesEnd.current.scrollIntoView(); }, 400)

			setLoad(false);
		}
	}, [roomId]);
	// Đây là hàm lấy dữ liệu từ api dựa vào state load
	// Dùng để load lại tin nhắn khi có socket từ server gửi tới
	useEffect(() => {
		if (load) {
			const fetchData = async () => {
				/////////////////////////////////////////////////////////////////////////
				const result = await ChatRoomsAPI.getMessageByRoomId(roomId);
				setMessage(result.text || []);
			};
			fetchData();
			setTimeout(() => { scrollToBottom() }, 400)
			setLoad(false);
		}
	}, [load]);

	// Hàm này dùng để gửi tin nhắn cho khách hàng
	const handlerSend = () => {
		if (textMessage) {
			if (!roomId) {
				return;
			}

			const data = {
				message: textMessage,
				roomId: roomId,
				is_admin: true,
			};

			setTimeout(() => {
				socket.emit('send_message', data);
			}, 100);

		}
	};

	const handleRoomChange = (roomId) => {
		setRoomId(roomId);
	}

	useEffect(() => {
		socket.on('receive_message', (data) => {
			console.log('oke');
			if (data === 'fail') {
				console.log('Don\'t send message');
			}
			if (data === 'success') {
				//Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
				setTextMessage('');
				setLoad(true);
			}
		});

		socket.on('createdRoom', (data) => { setRefRoom(true) })

		// Remove event listener on component unmount
		return () => socket.off('receive_message');
	}, [])
	// keos chat xuong
	function scrollToBottom() {
		messagesEnd.current.scrollIntoView({ behavior: "smooth" });
	}

	const styleUser = (id) => {
		const style = {
			color: roomId === id ? 'blue' : '#9a9797',
		}
		return style
	}

	return (
		<div className='card-body' >
			<div>
				<div className='row'>
					<div className='col-7 align-self-center'>
						<h4 className='page-title text-truncate text-dark font-weight-medium mb-1'>
							Chat
						</h4>
						<div className='d-flex align-items-center'>
							<nav aria-label='breadcrumb'>
								<ol className='breadcrumb m-0 p-0'>
									<li
										className='breadcrumb-item text-muted active'
										aria-current='page'>
										Apps
									</li>
									<li
										className='breadcrumb-item text-muted'
										aria-current='page'>
										Chat
									</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>
			</div>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-12'>
						<div className='card'>
							<div className='row no-gutters'>
								<div className='col-lg-3 col-xl-2 border-right'>
									<div className='card-body border-bottom'>
										<form>
											<input
												className='form-control'
												type='text'
												placeholder='Search Contact'
											/>
										</form>
									</div>
									<div
										className='chat-box scrollable position-relative'
										style={{ height: 'calc(80vh - 111px)' }}>
										<ul className='mailbox list-style-none'>
											<li>
												<div className='message-center'>
													{allRoom.length > 0 &&
														allRoom.map((value) => (
															<span
																key={value._id}
																onClick={() =>
																	handleRoomChange(value._id)
																}
																className='message-item d-flex align-items-center border-bottom px-3 py-2 active_user'>
																<div className='user-img'>
																	<img
																		src='https://img.icons8.com/color/36/000000/administrator-male.png'
																		alt='user'
																		className='img-fluid rounded-circle'
																		width='40px'
																	/>
																	<span className='profile-status away float-right'></span>
																</div>
																<div className='w-75 d-inline-block v-middle pl-2'>

																	<h6
																		style={styleUser(value._id)}
																		className='message-title mb-0 mt-1'>
																		{value._id}
																	</h6>
																</div>
															</span>
														))}
												</div>
											</li>
										</ul>
									</div>
								</div>
								<div className='col-lg-9  col-xl-10'>
									<div
										className='chat-box scrollable position-relative'
										style={{ height: 'calc(80vh - 111px)' }}>
										<ul className='chat-list list-style-none px-3 pt-3'>
											{message && message.length > 0 &&
												message.map((value) =>
													value.is_admin ? (
														<li
															className='chat-item odd list-style-none mt-3'
															key={value._id}>
															<div className='chat-content text-right d-inline-block pl-3'>
																<div className='box msg p-2 d-inline-block mb-1'>
																	You: {value.message}
																</div>
																<br />
															</div>
														</li>
													) : (
														<li
															className='chat-item list-style-none mt-3'
															key={value._id}>
															<div className='chat-img d-inline-block'>
																<img
																	src='https://img.icons8.com/color/36/000000/administrator-male.png'
																	alt='user'
																	className='rounded-circle'
																	width='45'
																/>
															</div>
															<div className='chat-content d-inline-block pl-3'>
																<h6 className='font-weight-medium'>
																	{value.name}
																</h6>
																<div className='msg p-2 d-inline-block mb-1'>
																	Client: {value.message}
																</div>
															</div>
															<div className='chat-time d-block font-10 mt-1 mr-0 mb-3'></div>
														</li>
													)
												)}
											<div style={{ float: "left", clear: "both" }}
												ref={messagesEnd} />
										</ul>
									</div>
									<div className='card-body border-top'>
										<div className='row'>
											<div className='col-9'>
												<div className='input-field mt-0 mb-0'>
													<input
														id='textarea1'
														placeholder='Type and enter'
														className='form-control border-0'
														type='text'
														onChange={onChangeText}
														value={textMessage}
													/>
												</div>
											</div>
											<div className='col-3'>
												<span
													className='btn-circle btn-lg btn-cyan float-right text-white'
													onClick={handlerSend}
												>
													<i className='fas fa-paper-plane'></i>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;
