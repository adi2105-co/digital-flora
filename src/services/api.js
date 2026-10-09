import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/plants';

export const getAllPlants = async (search = '', category = '') => {
  try {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;

    const response = await axios.get(API_BASE_URL, { params });

    // Safely extract the array whether backend returns { data: [...] } or direct [...]
    if (Array.isArray(response.data?.data)) {
      return response.data.data;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching all plants:', error.message);
    return [];
  }
};

export const getPlantsBySymptom = async (symptom) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health-advisor`, {
      params: { symptom }
    });

    if (Array.isArray(response.data?.data)) {
      return response.data.data;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching plants by symptom:', error.message);
    return [];
  }
};

export const getPlantById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data?.data || response.data;
  } catch (error) {
    console.error(`Error fetching plant with ID ${id}:`, error.message);
    return null;
  }
};