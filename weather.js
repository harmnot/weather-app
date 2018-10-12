const apiKey    = "d517f6301b6d48d79fd104413180510"; // if KEY doesnt  work, try to get new key
let callApi     = `https://api.apixu.com/v1/forecast.json?key=${apiKey}&q=`; // back to fetch (url)

setTimeout(() => { // set time to stop the location
  navigator.geolocation.clearWatch(CheckLoc);
}, 2000);  // if cant found your location, change the setTimeout 7000? 15000?

const displayLocationInfo = position => { // to get position / call our position

  const lat = position.coords.latitude; // check here : https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  const lon = position.coords.longitude;
  let url   = `${callApi}${lat},${lon}&days=4`; // url API  "forecast"

fetch(url) // guide to call the API , look : https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
.then(respond => respond.json()) // to connect the database of them
.then(data    => {

// create forecast for 3 days

// variable for the data
const forecast3days = data.forecast.forecastday;// to get the date of forecast
const lokasi        = data.location.name; // to get current location
const temp_c        = Math.floor(data.current.temp_c); // to get celcius type data "decimal"
const kondisi       = data.current.condition.text; // to get the condition by text
const currentIcon   = data.current.condition.icon; // to get icons (should add https://)
const humid         = data.current.humidity; // to get humidity

const theIcon       = `https:${currentIcon}`
// ------------ End the variable ---------------------------------------------------



// `map` forecast of 3 days (date) , the result is array ---------------------------
const filterDate = forecast3days.map(x => {
  return  x.date
})
let days      = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']; // to convert it, easier with moment.js , to explain this go : http://tiny.cc/147xzy
const eachDate  = filterDate.map( theDay =>  // then  map again the filterDate , result : array
days[new Date(theDay).getDay()]); //not using bracket "{}" because it gonna be undefined
// console.log(filterDate)
// ---------------------- end eachDate : for the 3 days forecast
// console.log(eachDate) // to make sure it works, we must return `map`, if not, it gonna be undefined

// `map`  forecast of average temperatur C , the result is array ---------------------------
const filterAvg  = forecast3days.map(theC => {
  return Math.floor(theC.day.avgtemp_c) // type data "decimal"
})
// console.log(filterAvg)
// --------------------- end the filterAvg -------------------------------------------------

// `map`  forecast of Conditions , the result is array ---------------------------
const thisWeather = forecast3days.map( theCondition => {
  return theCondition.day.condition.text
});
// console.log(thisWeather)
//end of the thisWeather ----------------------------------------------


// `map`  forecast of icons , the result is array ---------------------------
const iCon3days   = forecast3days.map( theIcon => {
  return theIcon.day.condition.icon
})
//
// const iCon_1 = `https:${iCon3days[0]}`
const iCon_1 = `https:${iCon3days[1]}`
const iCon_2 = `https:${iCon3days[2]}`
const iCon_3 = `https:${iCon3days[3]}`
// end of the icons -------------------------------------------


// DOM now (display everthing) -------------------------------------------
let anotherDiv                = document.createElement("div");
      anotherDiv.className    = "forecastDay main"
      anotherDiv.innerHTML    = `<h1 class="contentnya"> ${temp_c}&#8451;</h1>
                                <p class="kurent"> ${lokasi} </p> <p class="kurent2"> ${kondisi} </p>
                                <p class="kurent3"> humidity: ${humid}% </p>
                                <img class="icons" src="${theIcon}" alt="foto awan"> `
      // console.log(anotherDiv)

  let getIt                   = document.querySelector("div.container00").appendChild(anotherDiv)


let anotherDiv_2              = document.createElement("div");
    anotherDiv_2.className    = "forecastDay second"
    anotherDiv_2.innerHTML    = `  <table>
                                <tr>
                                  <th class="hari">${eachDate[1]}</th>
                                  <th class="hari">${eachDate[2]}</th>
                                  <th class="hari">${eachDate[3]}</th>
                                </tr>
                                <tr>
                                  <td><img class="iconfore" src="${iCon_1}" alt="weather image here"></td>
                                  <td><img class="iconfore" src="${iCon_2}" alt="weather image here"></td>
                                  <td><img class="iconfore" src="${iCon_3}" alt="weather image here"></td>
                                </tr>
                                <tr>
                                  <td class="avg">${filterAvg[1]}&#8451;</td>
                                  <td class="avg">${filterAvg[2]}&#8451;</td>
                                  <td class="avg">${filterAvg[3]}&#8451;</td>

                                      </tr>
                                      </table>`
	let getIt2                    = document.querySelector("div.main")
				getIt2.after(anotherDiv_2) // dom after only support for newest mozilla and chrome, IE might not
// -----------**************--------------------------------------------- end DOM



})
.catch(err  => { // if the API error, do what  you want
alert("error_try_again".toUpperCase())

}); // end to get "data"

}; // end the displayLocationInfo  function ---------------------------------------

const erro = ( ) => { /// if the location get error
  alert("sorry we can't found your location")
};
const CheckLoc = navigator.geolocation.watchPosition(displayLocationInfo, erro); // function to get the location
// we could use to .getCurrentLocation, but we need to make a button first to react that
