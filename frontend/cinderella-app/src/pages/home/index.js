import React, { useEffect, useState } from 'react';
import { getProducts} from '../../api/products'
import Hero from '../../components/hero';
import { useParams, Link } from 'react-router-dom';

// import useParams
// import Link

const HomePage = () => {
  const [data, setData] = useState(null);
  const {type} = useParams(); // Fix me!

  useEffect(() => {
    async function getProductsData() {
      let productsData = await getProducts();
      if(type !== undefined) productsData = productsData.filter(e => e.type === type);
      setData(productsData);
    }

    getProductsData();
  }, [type]);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="page">
      <Hero />
      {/*<h3>
        <span className="pet-type-label">{type ? `${type}s` : 'Pets'}</span>{' '}
        available for adoption near you
      </h3>*/}
      {console.log(data)}
      {data.length ? (
        <div className="grid">
          {data.map((product) => (
            <Link // Change me to a Link!
              key={product.id}
              to={`/${product.type.toLowerCase()}/${product.id}`}
              className="pet"
            >
              <article>
                <div className="pet-image-container">
                  {
                    <img
                      className="pet-image"
                      src={
                        product.img ||
                        '/missing-animal.png'
                      }
                      alt=""
                    />
                  }
                </div>
                <h3>{product.name + " " + product.model + " £" + product.price}</h3>
                <p>Size: {product.size}</p>
                <p>Available: {product.qty}</p>
                <p>Type: {product.type}</p>
              </article>
            </Link> // Don't forget to change me!
          ))}
        </div>
      ) : (
        <p className="prompt">No {type}s available now.</p>
      )}
    </div>
  );
};

export default HomePage;
