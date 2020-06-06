const request = require("request");

// Here we are using mapbox api's geocoding method
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWlzaXdlYiIsImEiOiJja2F0b3FndXAxMTdpMnBxZnBpMWhpbzI2In0.NquNyCgiTwuenZ86g3nHww`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location! Try again.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
