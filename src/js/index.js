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

breedSelect.classList.add('is-hidden');
catInfo.classList.add('is-hidden');
loader.classList.add('is-hidden');
error.classList.add('is-hidden');

fetchBreeds()
  .then(breeds => {
    console.log('all breads', breeds);
    breeds.forEach(breed => {
      breedSelect.classList.remove('is-hidden');
      console.log('breed', breed.name);
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(error => {
    console.log(error);
    Loading.remove();
    Notify.failure('Oops! Something went wrong! Try reloading the page!', {
      timeout: 4000,
      fontSize: '20px',
    });
  });

breedSelect.addEventListener('change', e => {
  Loading.circle('Loading data, please wait...');
  const breedId = e.target.value;

  fetchCatByBreed(breedId)
    .then(cat => {
      console.log(cat);
      const { name, description, temperament } = cat[0].breeds[0];
      catInfo.innerHTML = `
    <div>
    <img src="${cat[0].url}" alt="${name}" width="400"/>
  </div>
  <div class="pretty">
    <h1>${name}</h1>
    <p>${description}</p>
    <p><b>Temperament:</b> ${temperament}</p>
  </div>`;
      Loading.remove();
      catInfo.classList.remove('is-hidden');
    })
    .catch(error => {
      console.log(error);
      Loading.remove();
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        timeout: 4000,
        fontSize: '20px',
      });
    });
});
