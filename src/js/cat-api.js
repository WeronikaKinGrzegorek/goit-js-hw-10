import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_uaBet4kZnlpPyoO8jLxecvDHBAoAm6OfibtypPsDdd0woAwCIw5VzQaEnGpHNegu';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      new Error('Oops! Something went wrong! Try reloading the page!');
    });
}
