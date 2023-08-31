import React, { useEffect, useState } from 'react';
import { getProductDetails }  from '../../api/products'; 
import Hero from '../../components/hero';
import { useParams, Navigate } from 'react-router-dom';
import {cookies} from '../../App';
import { useDispatch } from 'react-redux';
import { increment } from '../../store/cartSlice';

// Import useParams
// Import Navigate

const ProductDetailsPage = () => {  
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {id} = useParams(); 

  useEffect(() => {
    async function getProductsData() {
      try {
        const productData = await getProductDetails(id);
        setData(productData);
        setError(false);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }

    getProductsData();
  }, [id]);

  
  function handleCart(product){
    const currentCart = cookies.get("SESSION");
    product.qty = 1;
    let newCart = {
      ...currentCart,
      cart: [...currentCart.cart, product]
    }  
    cookies.set("SESSION",newCart)
    dispatch(increment());
  }

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <div>
          {/* Redirect to /pet-details-not-found if there was an error! */}
          <Navigate to={"/product-details-not-found"}/>
        </div>
      ) : (
        <main>
          <Hero
            image={data[0].img || 'https://i.imgur.com/aEcJUFK.png'}
            displayText={`${data[0].model}`}
          />
          <div className="pet-detail">
            <div className="pet-image-container">
              <img
                className="pet-image"
                src={
                  data[0].img || 'https://i.imgur.com/aEcJUFK.png'
                }
                alt=""
              />
            </div>
            <div>
              <h1>{data[0].name}</h1>
              <h3>Model: {data[0].model}</h3>
              <p>Type: {data[0].type}</p>
              <p>Size: {data[0].size}</p>
              <p>Price: {data[0].price}</p>
              <p>Available: {data[0].qty}</p>
              <button onClick={()=>{ handleCart(data[0])}}>Add to cart</button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default ProductDetailsPage;
