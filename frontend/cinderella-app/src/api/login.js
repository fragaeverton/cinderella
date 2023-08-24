import { API_ENDPOINT } from ".";

export const createUser = async (formData) => {
    try{
        const response = await fetch(`${API_ENDPOINT}/login/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });  
        return response.ok ? "ok" : "failed";
    }catch(error){
        return error;
    }
}

export const userLogin = async (formData) => {
    try{
        const response = await fetch(`${API_ENDPOINT}/login/pass`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        return await response.json();
    }catch(error){
        return error;
    }
}
