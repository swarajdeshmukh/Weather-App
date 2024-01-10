const apikey = "b57d3402358968ff76fb4b8babf9b946";

const weatherDataEl = document.getElementById("weather-data")
const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit",(event1) => {
  event1.preventDefault();
  const cityValue = cityInputEl.value;
  // console.log(cityValue);
  getWetherData(cityValue);
});

async function getWetherData(cityValue){
  try{
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);


      if(!response.ok){
        throw new Error("Network Response was not ok")
      }

      const data = await response.json()

      const temperature = Math.round(data.main.temp)
      const description = data.weather[0].description
      const icon = data.weather[0].icon

      const details = [
        `Feels like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${Math.round(data.main.humidity)}%`,
        `Wind speed: ${Math.round(data.wind.speed)} m/s`,
      ]

      weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="">`

      weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;

      weatherDataEl.querySelector(".description").textContent = description;
  
      weatherDataEl.querySelector(".details").innerHTML = details
        .map((detail) => `<div>${detail}</div>`)
        .join("");

  }catch(erroe){
    
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "An error happened, please try again later";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}