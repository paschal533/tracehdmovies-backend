const express = require("express");
const xtorrent = require('xtorrent');
const cors = require("cors");

var allowedOrigins = ['http://localhost:3000', 'https://tracehdmovies.com'];
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const app = express();

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use('/', cors(corsOptions));
app.options("*", cors());


const port = process.env.PORT || "8000";

app.get("/", async (req, res) => {
     res.send("hello dear")
});

app.get("/movie", async (req, res) => {
  xtorrent.search({query: req.query.name , category: req.query.type}).then(data => {
  res.json(data);
  });
})

app.get("/download", async (req, res) => {
  xtorrent
  .info(
    `https://1337x.to/${req.query.torrent}/${req.query.movieId}/${req.query.movieName}/`
  ).then(data => {
  res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
