'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// 244. our first AJAX call: XMLHttpRequest

// AJAX
// 1- The most old school of AJAX is : XML HTTP request function
const getCountryDate = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); // destructuing, because its an object inside an array
    console.log(data);

    //   create a templet leteral :
    const html = `
     <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(1)} People</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
     </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// Note that the order of the following function calls will not be in that order due to 'load' event, the first one will appear at first then the second and so on...
// to solve this issue, we have to "chain the requests" (will be taken next lecture)
getCountryDate('portugal');
getCountryDate('spain');
getCountryDate('egypt');
getCountryDate('turkey');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
