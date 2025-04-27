const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
};
