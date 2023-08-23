import React, { useState, useEffect } from 'react';
import Hero from '../../components/hero';
import { getProducts } from '../../api/products';
import Product from '../../components/product';
// Import useSearchParams
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {

  // Get searchParams object from useSearchParams
  const [searchParams] = useSearchParams();

  const productNameToFind = searchParams.get('name');  // Get query parameter using searchParams object

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProductsData() {
      const productsData = await getProducts();
      const allCase = productNameToFind.toUpperCase();
      let filteredProduct = productsData.filter(e => e.model.toUpperCase().indexOf(allCase) > -1 || e.name.toUpperCase().indexOf(allCase) > -1);
      setProducts(filteredProduct);
    }

    getProductsData();
  }, [productNameToFind]);

  return (
    <div className="page">
      <Hero displayText={`Results for ${productNameToFind}`} />

      {/*<h3>Pets available for adoption near you</h3>*/}
      <main>
        <div className="grid">
          {products.map((product) => (
            <Product prod={product} key={product.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
