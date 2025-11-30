import api from './api';

export const getDestinations = async () => {
  try {
    const response = await api.get('/destinations');
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
};

export const getDestinationById = async (id) => {
  try {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destination:', error);
    throw error;
  }
};

export const getDestinationsByCategory = async (category) => {
  try {
    const response = await api.get(`/destinations/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations by category:', error);
    throw error;
  }
};

export const createDestination = async (destinationData) => {
  try {
    const response = await api.post('/destinations', destinationData);
    return response.data;
  } catch (error) {
    console.error('Error creating destination:', error);
    throw error;
  }
};

export const updateDestination = async (id, destinationData) => {
  try {
    const response = await api.put(`/destinations/${id}`, destinationData);
    return response.data;
  } catch (error) {
    console.error('Error updating destination:', error);
    throw error;
  }
};

export const deleteDestination = async (id) => {
  try {
    const response = await api.delete(`/destinations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting destination:', error);
    throw error;
  }
};