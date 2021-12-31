async function getData(location, unit) {
  const request = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&APPID=94eb5743519430c4420da984422eb6f5`,
    { mode: "cors" }
  );
  const data = await request.json();
  return data;
}

function processJSON(data) {
  const { main, weather, name } = data;
  const temperature = main.temp;
  const icon_url = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
  return { temperature, icon_url, name };
}

const btn = document.getElementById("search");
btn.addEventListener("click", () => {
  const input = document.querySelector("input");
  const unit = document.querySelector("label>input[name='unit']:checked").value;
  console.log(unit);
  const location = input.value;
  getData(location, unit)
    .then((data) => {
      renderData(data);
    })
    .catch((error) => {
      console.log("Something went wrong");
      renderError();
    });
});

function clearScreen() {
  const content = document.getElementById("content");
  content.innerHTML = "";
}

function renderData(data) {
  const { temperature, icon_url, name } = processJSON(data);

  const city = document.querySelector("#city");
  const temp = document.querySelector("#temperature");
  const icon = document.querySelector("#icon");

  const tempSpan = document.querySelector(".large");

  tempSpan.appendChild(temp);

  city.textContent = name;
  temp.textContent = temperature + "°";
  icon.src = icon_url;
}

function renderError() {
  const content = document.getElementById("content");
  const error = document.createElement("h1");
  error.setAttribute("class", "error");
  error.textContent = "Not Found!";

  clearScreen();
  content.appendChild(error);
}

function main() {
  getData("Peshawar", "metric").then((data) => {
    renderData(data);
  });
}

main();
