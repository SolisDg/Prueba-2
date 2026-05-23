//Servicio de API

const API_URL = 'http://localhost:3300/api';

async function fetchAPI(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    const response = await fetch(`${API_URL}${endpoint}`, finalOptions);
    if (!response.ok){
        const errorData = await response.json().catch(() => ({}));
        throw new Error (errorData.message || `Error HTTP: ${response.status}`);
    }
    return response.json();
}

//Funciones de productos:
export const getProducts = async(page = 1, limit = 10) => {
    return fetchAPI(`/products?page=${page}&limit=${limit}`);
};

export const getProduct = async (id) => {
    return fetchAPI(`/products/${id}`);
};

export const createProduct = async (productData) => {
    return fetchAPI('/products', {
        method: 'POST',
        body: JSON.stringify(productData)
    });
};

export const updateProduct = async (id, productData) => {
    return fetchAPI(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData)
    });
};

export const deleteProduct = async (id) => {
    return fetchAPI(`/products/${id}`, {
        method: 'DELETE'
    });
};

//Funciones de usuarios:
export const getUsers = async (page = 1, limit = 10) => {
    return fetchAPI(`/users?page=${page}&limit=${limit}`);
};

export const getUser = async (id) => {
    return fetchAPI(`/users/${id}`);
};

//Funciones de categorías:
export const getCategories = async () => {
    return fetchAPI('/categories');
};

export default fetchAPI;