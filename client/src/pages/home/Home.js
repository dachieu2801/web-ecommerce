import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import ListCity from '../../components/ListCity/ListCity'
import TypeHotels from '../../components/TypeHotels/TypeHotels'
import ListHotels from '../../components/ListHotels/ListHotels'
import FormRegistor from '../../components/FormRegistor/FormRegistor'
import Footer from '../../components/Footer/Footer'
import './Home.css'

const Home = () => {


	return (
		<div>
			{/* navbar and header */}
			<div className='container-navbar' >
				<div className='container color-while'>
					<NavBar />
					<Header />
				</div>
			</div>
			{/* list */}
			<div className='container'>
				<ListCity />
				<TypeHotels />
				<ListHotels />
			</div>
			<div>
				<FormRegistor />
			</div>
			<div className='container'>
				<Footer />
			</div>
		</div>
	);
};

export default Home;
