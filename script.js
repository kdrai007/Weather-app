// require("dotenv").config();
const cityInput = document.querySelector(".city");
const submitBtn = document.querySelector(".btn");
const image = document.querySelector(".image");
//Api Key
const apiKey = "";

submitBtn.addEventListener("click", () => {
  showWeather();
});

function showWeather() {
  const city = cityInput.value;
  if (city === "") {
    console.log("please enter some value");
    return;
  }
  fetch(
    ` https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.cod === "404") {
        document.querySelector(".data").classList.add("hidden");
        document.querySelector(".error").classList.remove("hidden");
        return;
      }
      switch (data.weather[0].main) {
        case "Haze":
          image.src = "./assets/rainy.svg";
          console.log("haze");
          break;
        case "Clouds":
          image.src = "./assets/cloudy.svg";
          console.log("Cloudy");
          break;
        case "Snow":
          image.src = "./assets/snowy-3.svg";
          console.log("snow");
          break;
        case "Clear":
          image.src = "./assets/day.svg";
          console.log("Clear");
          break;
        default:
          image.src = "./assets/thunder.svg";
          console.log(data.weather[0].main);
          break;
      }
      document.querySelector(".data").classList.remove("hidden");
      document.querySelector(".show-temp").textContent = data.main.temp;
    })
    .catch((err) => console.log(err));

  setInterval(() => {
    document.querySelector(".error").classList.add("hidden");
  }, 3000);
  cityInput.value = "";
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    showWeather();
  }
});
