import './App.css';
import './css/custom.css';
import './css/style.default.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './Share/Footer/Footer';
import Header from './Share/Header/Header';
import Home from './Home/Home';
import Detail from './Detail/Detail';
import Cart from './Cart/Cart';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import ChangePassword from './Authentication/ChangePassword';
import ForgotPassword from './Authentication/ForgotPassword';
import Checkout from './Checkout/Checkout';
import Shop from './Shop/Shop';
import MainHistory from './History/Component/MainHistory';
import DetailHistory from './History/Component/DetailHistory';
import Chat from './Share/Chat/Chat';

function App() {

	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/detail/:id' element={<Detail />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/signin' element={<SignIn />} /> 
					<Route path='/user/change-password' element={<ChangePassword />} /> 
					<Route path='/forgot-password' element={<ForgotPassword />} /> 
					<Route path='/signup' element={<SignUp />} />
				  <Route path='/checkout' element={<Checkout />} />
          <Route path='/history/:id' element={<DetailHistory />} />
					<Route path='/history' element={<MainHistory />} />
					<Route path='/shop' element={<Shop />} /> 
				</Routes>
			</BrowserRouter>

			<Chat />

			<Footer />
		</div>
	);
}

export default App;
