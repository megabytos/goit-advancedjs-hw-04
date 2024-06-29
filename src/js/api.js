import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '44676438-8f15550b2268961ea3e6a8228';

export const fetchImages = async (query, page = 1, per_page) => {
  if (query) {
    const { data } = await axios({
      method: 'GET',
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: query,
        per_page,
        page,
      },
    });
    return data;
  }
};
