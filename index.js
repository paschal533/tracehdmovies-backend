const express = require("express");
const xtorrent = require('xtorrent');
const cors = require("cors");

var allowedOrigins = ['http://localhost:3000', 'https://tracehdmovies.com'];

const app = express();

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });
app.disable('etag');
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
app.options("*", cors());


//const PORT = process.env.PORT || 3000;


app.get("/", async (req, res) => {
     res.send("hello dear")
});

app.get("/movie", async (req, res, next) => {
  try {
     await xtorrent.search({query: req.query.name , category: req.query.type}).then(data => {
      res.json(data);
      });
  } catch (error) {
    next(error);
  }
});

app.get("/download", async (req, res) => {
  xtorrent
  .info(
    `https://1337x.to/${req.query.torrent}/${req.query.movieId}/${req.query.movieName}/`
  ).then(data => {
  res.json(data);
  });
});

const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});

/*app.listen(PORT, () => {
  console.log(`Listening to requests on http://localhost:${PORT}`);
});*/
