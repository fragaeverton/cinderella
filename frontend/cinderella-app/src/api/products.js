import { API_ENDPOINT } from ".";

export const getProducts = async () => {
    const response = await fetch(`${API_ENDPOINT}/products`);
    const products = await response.json();

    return products;
}

export const getProductTypes = async () => {
    const response = await fetch(`${API_ENDPOINT}/products/types`);
    const products = await response.json();

    return products;
}


export const getProductDetails = async (id) => {
    const response = await fetch(`${API_ENDPOINT}/products/${id}`);
    const products = await response.json();

    return products;
}