const API_KEY = "YOUR_API_KEY";

async function getWeather() {

    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    const API_URL =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        console.log(data);

        document.getElementById("cityName").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("condition").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("tempDetails").textContent =
            `${Math.round(data.main.feels_like)}°C`;

        const iconCode = data.weather[0].icon;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("weatherCard")
            .classList.remove("hidden");

        document.getElementById("errorMessage")
            .textContent = "";

    } catch (error) {

        document.getElementById("weatherCard")
            .classList.add("hidden");

        document.getElementById("errorMessage")
            .textContent = "❌ City not found. Please try again.";
    }
}p