console.log("Client side javascript file loaded...!");

// // Fetch data from the dummy api
// const fetchData = async () => {
//   const data = await fetch("http://puzzle.mead.io/puzzle");
//   console.log(await data.json());
// };
// fetchData();

const form = document.querySelector("form");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");
const error = document.querySelector("#error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = e.target[0].value;
  if (!location) {
    return (error.textContent = "Please enter the address...!");
    msg1.textContent = "";
  }
  // Start the loader
  msg1.textContent = "Loading...";

  // Fetch the data (WE CHANGE LOCALHOST URL TO RELATIVE URL BCUZ OF WE HOSTED IT ON HEROKU)
  // fetch(`http://localhost:3000/weather?address=${location}`).then(
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        error.textContent = data.error;
        msg1.textContent = "";
      } else {
        msg1.textContent = data.location;
        msg2.textContent = `Cloud: ${data.forecast.cloud} and Temp: ${data.forecast.temprature}`;
      }
    });
  });
});
