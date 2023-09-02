import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

fetchBreeds()
  .then(breeds => {
    console.log(breeds);
    breeds.forEach(breed => {
      console.log(breed);
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);

      new SlimSelect({
        select: '.breed-select',
      });
    });

    fetchCatByBreed(breeds.id);
  })
  .catch(error);

breedSelect.addEventListener('change', e => {
  Loading.circle('Loading data, please wait...');
  const breedId = e.target;
  console.log(e.target);
  console.log(breedId);
  console.log(typeof breedId);
  fetchCatByBreed(breedId).then(cat => {
    console.log(cat);
    catInfo.innerHTML = `
    <div>
    <img src="${cat[0].url}" alt="${cat[0].breeds[0].name}" width="400"/>
  </div>
  <div>
    <h1>${cat[0].breeds[0].name}</h1>
    <p>${cat[0].breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${cat[0].breeds[0].temperament}</p>
  </div>`;
  });
  Loading.remove();
});

// fetchBreeds().then(breeds => {
//   console.log(breeds);
//   for (let i = 0; i < breeds.length; i++) {
//     const breed = breeds[i];
//     const option = document.createElement('option');
//     option.value = i;
//     option.textContent = breed.name;
//     breedSelect.appendChild(option);
//   }

//   fetchCatByBreed(breeds[0].id);
// });
