import axios from 'axios';

const API_URL = 'https://openlibrary.org/works/';

export const fetchBooks = async (query, page, limit) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        q: query,
        page: page,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
