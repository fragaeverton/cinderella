import React from "react";
import { cookies } from "../../App";

const Cart = () =>{
    const obj = cookies.get("SESSION").cart;
    const combined = obj.reduce((result, current) => {
        const existing = result.find(item => item.id === current.id);
        
        if (existing) {
          existing.qty += current.qty;
        } else {
          result.push({ ...current });
        }
        
        return result;
    }, []);
    return(
        <div className="grid">
            <div className="cart">
                <h3>Shopping Cart</h3>
                <ul className="cart-list">
                    {
                        combined.map((product) => (
                            <li key={product.id} className="cart-item" >
                                <div className="pet-image-container-smaller">{
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
                                <div className="item-details">{`  ${product.name} ${product.model}  Qty. ${product.qty} £ ${product.price}  `}
                                    <button className="remove-button">Remove</button>
                                </div>
                            </li> 
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Cart;