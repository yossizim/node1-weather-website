const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
//define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");
//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup for static directory to serve
app.use(express.static(publicDirectoryPath));
//dont need this bc express.static takes the program directy to our html file.
//which inreturn overrides this hole app.get method.
// app.get("", (req, res) => {
//   res.send("<h1>home page</h1>");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "weather ",
    name: "yossi zimbler",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me ",
    name: "yosef zimbler",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "yossi zimbler",
    title: "help page",
    number: "02342342",
    location: "south africa",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "must provide a location",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: "please provide valid coordinates",
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: "please provide a valid location",
          });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
}),
  app.get("/product", (req, res) => {
    if (!req.query.search) {
      return res.send({
        error: "must provide a valid search option",
      });
    }
    console.log(req.query.search);
    res.send({ product: [] });
  });

app.get("/help/*", (req, res) => {
  res.render("help/*", {
    title: "this is not a help page",
    name: "yossi zimbler",
  });
});
//the route handler for our 404 page
app.get("*", (req, res) => {
  res.send("this is a 404 page");
});

app.listen(port, () => {
  console.log("the server is running in port " + port);
});
//app.com
//app.com/help
//app.com/about
