import React, { useEffect, useState } from 'react';
import { getProductTypes} from '../../api/products'
import Logo from '../../assets/logo.svg';
import Search from '../search';

// Import NavLink
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    async function getProductTypesData() {
      const type = await getProductTypes();
      setProductTypes(type);
    }

    getProductTypesData();
  }, []);

  return (
    <nav>
      <div className="nav-logo">
        <img src={Logo} alt="Cinderella logo" id='my-logo' />
        <h1 id='site-name'>Cinderella</h1>
        <Search />
      </div>
      <ul className="nav-links">
        <li key={'all'}>
          {/* These links should be NavLink component and add a special active class name if its an active link */}
          <NavLink to="/"
            className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}` }
          >
            All Shoes
          </NavLink>
        </li>
        {productTypes
          ? productTypes.map((product) => (
              <li key={product.type}>
                {/* These links should be NavLink component and add a special active class name if its an active link */}
                <NavLink to={`/${product.type}`}
                  key={product.type}
                  className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}` }       >
                  {product.type}
                </NavLink>{' '}
              </li>
            ))
          : 'Loading...'}
      </ul>
    </nav>
  );
};

export default Navigation;
