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
import {AuthContextProvider} from './Context/AuthContext';

function App() {
	const [role, setRole] = useState(localStorage.getItem('role'))

	return (
		<div className='App'>
			<AuthContextProvider>
				<BrowserRouter>
					<div
						id='main-wrapper'
						data-theme='light'
						data-layout='vertical'
						data-navbarbg='skin6'
						data-sidebartype='full'
						data-sidebar-position='fixed'
						data-header-position='fixed'
						data-boxed-layout='full'>
						<Header role={role}/>
						<Menu role={role} />
						<div style={{margin:'80px 12px 0 270px'}}>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/history' element={<Home />} />
							<Route path='/login' element={<Login setRole={setRole} />} />
							<Route path='/chat' element={<Chat />}/>
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
