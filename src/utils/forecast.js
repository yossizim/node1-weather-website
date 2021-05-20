const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=5a2c19ed83f1c46661b1c2a831d7364e&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("can not connect to server", undefined);
    } else if (body.error) {
      callback("can not find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". it is currently " +
          body.current.temperature +
          " degress out. it feels like " +
          body.current.feelslike
      );
    }
  });
};
module.exports = forecast;
