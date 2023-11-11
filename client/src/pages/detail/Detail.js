import NavBar from '../../components/NavBar/NavBar'
import FormRegistor from '../../components/FormRegistor/FormRegistor';
import Footer from '../../components/Footer/Footer';
import ContentDetail from '../../components/ContentDetail/ContentDetail'

import './Detail.css'

const Detail = () => {
  return (
    <div >
      <div className='container-navbar' >
        <div className='container color-while padding-bottom'>
          <NavBar />
        </div>
      </div>
      <div className='container'>
        <ContentDetail />
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

export default Detail;
