export const fetchProducts = async (type, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`/.netlify/functions/products/${type}?${queryString}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch('/.netlify/functions/categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}; 