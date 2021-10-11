'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images');

// to handle pormise errors
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1; moved to finally() method
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
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
  countriesContainer.style.opacity = 1; // moved to finally() method
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

// const getCountrydata = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders[0];
//       if (!neighbor) return;
//       // country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbor'))
//     .catch(err => {
//       console.error(err);
//       renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1; // instead of loading spinner which used with asycn actions
//     });
// };

// btn.addEventListener('click', function (e) {
//   getCountrydata('uas');
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 251.Throwing Errors Manually  -  to fix "404" error

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

// const getCountrydata = function (country) {
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders[0];
//       // if no neighbor found >> throw an error telling that
//       if (!neighbor) throw new Error(`There is no neigbor!`);
//       // country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbor}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbor'))
//     .catch(err => {
//       renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1; // instead of loading spinner which used with asycn actions
//     });
// };

// btn.addEventListener('click', function (e) {
//   getCountrydata('australia');
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 252.Coding challange #1

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`you have an error: ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('There is no Fucking country!!!');
//       return res.json();
//     })
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//     })
//     .catch(err => console.log(err));
// };

// // whereAmI(52.508, 13.381);
// // whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 255. The Event loop in practice

// the simpliest Event loop example - immmp
// console.log('Start Test');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('End Test');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 256. Building a simple promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening...');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You Win 💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout : to convert setTimeout into async. function to make the page faster (improve performance - Optimization)
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(1)
//   .then(() => {
//     console.log('I have waited 1 sec');
//     return wait(1); //  to "chaining Promises" and avoid "callback Hell"
//   })
//   .then(() => {
//     console.log('I have waited 2 sec');
//     return wait(1); //  to "chaining Promises" and avoid "callback Hell"
//   })
//   .then(() => {
//     console.log('I have waited 3 sec');
//     return wait(1); //  to "chaining Promises" and avoid "callback Hell"
//   })
//   .then(() => console.log('I have waited 4 sec'));

// // immediate resolved/rejected promises
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject('Problem!!!').catch(err => console.error(err));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 257. Promisifying the Geolocation API

// instead of using geolocation API like this (old way):
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

// After Promisifing :
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // way 1
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );

//     // way 2
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// // getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`you have an error: ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('There is no Fucking country!!!');
//       return res.json();
//     })
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//     })
//     .catch(err => console.error(`${err.message} 💥`));
// };

// btn.addEventListener('click', whereAmI);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 258. coding challenge #2

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', reject);
  });
};
let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    console.log(currentImg);
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .catch(err => console.error(err));
