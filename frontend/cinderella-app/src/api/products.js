import { API_ENDPOINT } from ".";
import {cookies} from '../App';


export const getProducts = async () => {
    const response = await fetch(`${API_ENDPOINT}/products`,{ credentials: 'include'});
    const products = await response.json();  
    const { rows, session } = products;  
    let currentSession = cookies.get("SESSION") !== undefined ? cookies.get("SESSION") : {id: session, cart:[]}
    cookies.set("SESSION",{
        ...currentSession, 
        id:session
    })
    return rows;
}

export const getProductTypes = async () => {
    const response = await fetch(`${API_ENDPOINT}/products/types`,{ credentials: 'include'});
    const products = await response.json();

    return products;
}


export const getProductDetails = async (id) => {
    const response = await fetch(`${API_ENDPOINT}/products/${id}`,{ credentials: 'include'});
    const products = await response.json();

    return products;
}