import React from "react"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

const WeatherApi = () => {
   const [weather, setWeather] = useState({})

   useEffect(() => {
      navigator.geolocation.getCurrentPosition(success)

      function success(pos) {
         const crd = pos.coords

         console.log("Your current position is:")
         console.log(`Latitude : ${crd.latitude}`)
         console.log(`Longitude: ${crd.longitude}`)
         console.log(`More or less ${crd.accuracy} meters.`)
         axios
            .get(
               `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=cf74ae059a14d1682d4513a52d4319db&units=metric`
            )
            .then((res) => setWeather(res.data))
      }
   }, [])

   console.log(weather)

   const [isCelcius, setIsCelcius] = useState(true)

   const changeUnit = () => {
      setDegrees(!isCelcius)
   }

   return (
      <div>
         <div className="card">
            {" "}
            <h1 className="weather--gif">WEATHER APP</h1>{" "}
            <img
               src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`}
               alt=""
            />
            <h2>
               {weather.name}, {weather.sys?.country}
            </h2>
            <h3>
               {isCelcius
                  ? weather.main?.temp
                  : weather.main?.temp * (9 / 5) + 32}{" "}
               {isCelcius ? "°C" : "°F"} {weather.weather?.[0].description}
            </h3>
            <h3>
               <i class="fa-solid fa-wind"></i> Wind Speed {weather.wind?.speed}
               m/s
            </h3>
            <h3>
               <i class="fa-solid fa-cloud"></i> Today Clouds:{" "}
               {weather.clouds?.all}%
            </h3>
            <h3>
               <i class="fa-solid fa-temperature-three-quarters"></i> Pressure:{" "}
               {weather.main?.pressure} hPa
            </h3>
            <button onClick={() => setIsCelcius(!isCelcius)}>
               Degrees °C / °F {isCelcius}
            </button>
         </div>
      </div>
   )
}

export default WeatherApi
