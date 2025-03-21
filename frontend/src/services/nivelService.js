import api from './api';

export const getNiveis = async () => {
  const response = await api.get('/niveis');
  return response.data;
};

export const createNivel = async (nivel) => {
  const response = await api.post('/niveis', nivel);
  return response.data;
};

export const updateNivel = async (id, nivel) => {
  const response = await api.put(`/niveis/${id}`, nivel);
  return response.data;
};

export const deleteNivel = async (id) => {
  await api.delete(`/niveis/${id}`);
};
