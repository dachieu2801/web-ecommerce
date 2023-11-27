import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './Chat/Chat';
import Header from './Header/Header';
import Home from './Home/Home';
import Menu from './Menu/Menu';
import Products from './Products/Products';
import Users from './Users/Users';
import Login from './Login/Login';
import NewProduct from './New/NewProduct';
import UpDateProduct from './New/UpDateProduct';
import { AuthContextProvider } from './Context/AuthContext';
import './App.css'

function App() {
	const [role, setRole] = useState(localStorage.getItem('role'))

	return (
		<div className='App'>
			<AuthContextProvider>
				<BrowserRouter>

					<Header role={role} />
					<div className='row'>
						<div className='col-2 ' style={{ borderRight: '1px solid #ccc' }}>
							<Menu role={role} />
						</div>
						<div className='col-10  component'>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/history' element={<Home />} />
								<Route path='/login' element={<Login setRole={setRole} />} />
								<Route path='/chat' element={<Chat />} />
								<Route path='/users' element={<Users />} />
								<Route path='/products' element={<Products />} />
								<Route path='/products/:id' element={<UpDateProduct />} />
								<Route path='/new' element={<NewProduct />} />
							</Routes>
						</div>
					</div>
				</BrowserRouter>
			</AuthContextProvider>
		</div>
	);
}

export default App;
