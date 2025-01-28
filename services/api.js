import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api'
});

export const fetchProducts = async (type, params = {}) => {
  try {
    const response = await api.get(`/products/${type}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchSoftwareProducts = async (limit = 12, offset = 0, search = '', category = '', sortOrder = '') => {
  try {
    const response = await api.get('/products/software', {
      params: { limit, offset, search, category, sortOrder }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching software products:', error);
    throw error;
  }
};

export const fetchCourseProducts = async (limit = 12, offset = 0, search = '', category = '', sortOrder = '') => {
  try {
    const response = await api.get('/products/courses', {
      params: { limit, offset, search, category, sortOrder }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Adding default export as well
export default {
  fetchProducts,
  fetchCategories,
  fetchProductById,
  fetchSoftwareProducts,
  fetchCourseProducts
}; 