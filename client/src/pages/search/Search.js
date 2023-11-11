import SearchPopup from '../../components/SearchPopup/SearchPopup'
import SearchList from '../../components/SearchList/SearchList'

import './Search.css'
const Search = () => {
  return (
    <div className="container-search">
      <div>
        <SearchPopup />
      </div>
      <div>
        <SearchList />
      </div>
    </div >
  );
};

export default Search;
