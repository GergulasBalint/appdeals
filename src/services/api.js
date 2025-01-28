import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const fetchSoftwareProducts = async (limit = 12, offset = 0, search = '', category = '', sortOrder = '') => {
  try {
    const response = await api.get('/products', {
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
    const response = await api.get('/courses', {
      params: { limit, offset, search, category, sortOrder }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
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
    const response = await api.get(`/products/software/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export { api };