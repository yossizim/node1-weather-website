const request = require("request");

// //geocoding
// // adress->lat/long-> weather
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiemltYmxlciIsImEiOiJja29pZjhjNWQwanlnMm9qemRuMWh4N3U2In0.9THT4qaeZGM1KGNbTwYhAg&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("can not connect to server", undefined);
    } else if (body.features.length === 0) {
      callback("can not find location ", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[1],
        latitude: body.features[0].center[0],
        loacation: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
