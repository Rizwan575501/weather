document.addEventListener("DOMContentLoaded", () => {
  const locationInput = document.getElementById("location-input")
  const getWeatherBtn = document.getElementById("get-weather-btn")
  const weatherDisplay = document.getElementById("weather-display")
  const messageElement = document.getElementById("message")
  const cityNameElement = document.getElementById("city-name")
  const temperatureElement = document.getElementById("temperature")
  const descriptionElement = document.getElementById("description")
  const weatherIconElement = document.getElementById("weather-icon")

  const API_KEY = "0a79fb25909e1d29e47472bfd85cf727"
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

  const fetchWeatherData = async (location) => {
    if (!location) {
      displayMessage("Please enter a city name.")
      return
    }

    displayMessage("Loading weather data...")
    clearWeatherData()

    try {
      const response = await fetch(`${BASE_URL}?q=${location}&appid=${API_KEY}&units=metric`) // units=metric for Celsius
      const data = await response.json()

      if (response.ok) {
        if (data.cod === 200) {
          // Check if the API returned a successful response
          displayWeatherData(data)
        } else {
          displayMessage(data.message || "City not found. Please try again.")
        }
      } else {
        displayMessage(`Error: ${data.message || "Something went wrong."}`)
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
      displayMessage("Failed to fetch weather data. Please check your internet connection or try again later.")
    }
  }

  const displayWeatherData = (data) => {
    messageElement.classList.add("hidden")
    cityNameElement.textContent = data.name
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`
    descriptionElement.textContent = data.weather[0].description

    const iconCode = data.weather[0].icon
    weatherIconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    weatherIconElement.alt = data.weather[0].description
    weatherIconElement.classList.remove("hidden")
  }

  const displayMessage = (msg) => {
    messageElement.textContent = msg
    messageElement.classList.remove("hidden")
    clearWeatherData()
  }

  const clearWeatherData = () => {
    cityNameElement.textContent = ""
    temperatureElement.textContent = ""
    descriptionElement.textContent = ""
    weatherIconElement.src = ""
    weatherIconElement.alt = ""
    weatherIconElement.classList.add("hidden")
  }

  getWeatherBtn.addEventListener("click", () => {
    fetchWeatherData(locationInput.value.trim())
  })

  locationInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      fetchWeatherData(locationInput.value.trim())
    }
  })
})
