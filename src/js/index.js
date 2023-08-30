import { fetchBreeds } from './cat-api';

const breedSelect = document.querySelector('.breed-select');

fetchBreeds().then(breeds => {
  console.log(breeds);
  for (let i = 0; i < breeds.length; i++) {
    const breed = breeds[i];
    const option = document.createElement('option');
    option.value = i;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  }
});
