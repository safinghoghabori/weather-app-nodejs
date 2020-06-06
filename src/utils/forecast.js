const request = require("request");

const forecast = (lat, log, callback) => {
  const urlWeather = `http://api.weatherapi.com/v1/current.json?key=b562174b5a7c4cd4a16125405203005&q=${lat},${log}`;

  request({ url: urlWeather, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect the location service!", undefined);
    } else {
      callback(undefined, {
        temprature: response.body.current.temp_c,
        cloud: response.body.current.cloud,
      });
    }
  });
};

module.exports = forecast;
