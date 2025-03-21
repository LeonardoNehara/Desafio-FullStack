import api from './api';

export const getDesenvolvedores = async () => {
  const response = await api.get('/desenvolvedores');
  return response.data;
};

export const getDesenvolvedorPorId = async (idDesenvolvedor) => {
  const response = await api.get(`/desenvolvedores/${idDesenvolvedor}`);
  return response.data;
};

export const createDesenvolvedor = async (desenvolvedor) => {
  const response = await api.post('/desenvolvedores', desenvolvedor);
  return response.data;
};

export const updateDesenvolvedor = async (id, desenvolvedor) => {
  const response = await api.put(`/desenvolvedores/${id}`, desenvolvedor);
  return response.data;
};

export const deleteDesenvolvedor = async (id) => {
  await api.delete(`/desenvolvedores/${id}`);
};
