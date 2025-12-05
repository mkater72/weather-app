const apiKey = "399403eba7c3173b888b051cd66564a8";

const latInput = document.getElementById("latInput");
const lonInput = document.getElementById("lonInput");
const showWeatherBtn = document.getElementById("showWeatherBtn");
const resultBlock = document.getElementById("result");
const mapFrame = document.getElementById("mapFrame");

showWeatherBtn.addEventListener("click", () => {
    const lat = latInput.value.trim();
    const lon = lonInput.value.trim();

    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
        resultBlock.innerHTML = "<p>Введите корректные числа</p>";
        return;
    }

    getWeather(lat, lon);
});

async function getWeather(lat, lon) {
    resultBlock.innerHTML = "<p>Загрузка...</p>";

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            resultBlock.innerHTML = "<p>Ошибка: неверные координаты</p>";
            return;
        }

        const temp = Math.round(data.main.temp);
        const wind = data.wind.speed;
        const desc = data.weather[0].description;
        const icon = pickIcon(data.weather[0].main);

        resultBlock.innerHTML = `
            <p><strong>${temp}°C</strong></p>
            <p>${desc}</p>
            <p>Ветер: ${wind} м/с</p>
            <img src="src/icons/${icon}">
        `;

        updateMap(lat, lon);

    } catch (e) {
        resultBlock.innerHTML = "<p>Ошибка загрузки данных</p>";
    }
}

function pickIcon(main) {
    if (main === "Clear") return "sun.png";
    if (main === "Clouds") return "clouds.png";
    if (main === "Rain") return "rain.png";
    if (main === "Snow") return "snow.png";
    return "clouds.png";
}

function updateMap(lat, lon) {
    mapFrame.src = 
        `https://www.google.com/maps?q=${lat},${lon}&z=10&hl=ru&output=embed`;
}
