const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express(); //This will create an express application

// Define path for Express config(path.join will join the path)
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

// Set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// What to show when user arrives to the web browser
app.get("", (req, res) => {
  res.render("index", {
    title: "Index page",
    creator: "Saif Dasadiya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    creator: "John Doe",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    creator: "Safin Ghoghabori",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided...!",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }
      res.send({
        forecast: forecastData,
        location: data.location,
        address: req.query.address,
      });
    });
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "search query not provided...!",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

// For handling 404 error page [NOTE: This must be at last positioned]
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 error!",
    creator: "Las Johnson",
    errorMsg: "WTF is this :(",
  });
});

// To start server annd listen at specific port
app.listen(3000, () => {
  console.log("This is 3000 port running...");
});
