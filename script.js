'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// to handle pormise errors
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1; moved to finally() method
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${data.flags[0]}" />
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
  // countriesContainer.style.opacity = 1; moved to finally() method
};

///////////////////////////////////////

// 244. our first AJAX call: XMLHttpRequest

// AJAX
// 1- The most old school of AJAX is : XML HTTP request function

// const renderCountry = function (data) {
//   const html = `
//      <article class="country">
//           <img class="country__img" src="${data.flags[1]}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               data.population / 1000000
//             ).toFixed(1)} People</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//      </article>
//   `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const getCountrydata = function (country) {
//   const request = new XMLHttpRequest();
//   // request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText); // destructuing, because its an object inside an array
//     console.log(data);

//     //   create a templet leteral :
//     renderCountry(data);
//   });
// };

// // Note that the order of the following function calls will not be in that order due to 'load' event, the first one will appear at first then the second and so on... (paraller apperance)
// // to solve this issue, we have to "chain the requests" (will be taken next lecture)
// getCountrydata('portugal');
// getCountrydata('spain');
// getCountrydata('egypt');
// getCountrydata('turkey');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//246. Welcome to CallBack Hell
// in this lecutre it runs in (sequence) not in paraller as previous ex

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   // request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText); // destructuing, because its an object inside an array
//     console.log(data);

//     // Render Country 1
//     renderCountry(data);
//     const [neighbor] = data.borders;
//     console.log(neighbor);
//     // Get neighbor Country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbor');
//     });
//   });
// };

// // getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('spain');
// // getCountryAndNeighbour('egypt');
// // getCountryAndNeighbour('turkey');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 248. Consuming Promises

// the modren way of XMLHTTPRequest()
// // .then means: do the next order to this promise.      .this comes with promises only
// const getCountrydata = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json()) // json() was written as a method of response to converts the pending status into handled formation
//     .then(data => renderCountry(data[0])); // .then used because "response.json()" will return a promise and to handle it we need ".then"
//   // these previous two "thens" are small chain
// };
// getCountrydata('portugal');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 249. Chanining Promises - The Best Practice

// for country >> neighbor
// const getCountrydata = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders[0];
//       // return the fetch output (promise) and write .then .then outside to avoid calling a callback fucntion inside a callback function (to avoid callback Hell)
//       return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbor'));
// };

// getCountrydata('portugal');

// for country >> neighbor >> neighbor the neighbor
// const getCountrydata = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders[0];
//       return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data, 'neighbor');
//       const neighbor2 = data.borders[0];
//       return fetch(`https://restcountries.com/v2/alpha/${neighbor2}`);
//     })
//     .then(responce => responce.json())
//     .then(data => renderCountry(data, 'neighbor'));
// };

// getCountrydata('portugal');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 250. Handling Rejected Promises === error

const getCountrydata = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbor'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1; // instead of loading spinner which used with asycn actions
    });
};

btn.addEventListener('click', function (e) {
  getCountrydata('portugal');
});
