import React from 'react';

const Product = ({ prod }) => {
  console.log(prod)
  return (
    <a
      key={prod.id}
      href={`/${prod.type.toLowerCase()}/${prod.id}`}
      className="pet"
    >
      <article>
        <div className="pet-image-container">
          {
            <img
              className="pet-image"
              src={
                prod.img || 'https://i.imgur.com/aEcJUFK.png'
              }
              alt=""
            />
          }
        </div>
        <h3>{prod.name}</h3>
        <p>Model: {prod.model}</p>
        <p>Price: {prod.price}</p>
        <p>Available: {prod.qty}</p>
      </article>
    </a>
  );
};

export default Product;
