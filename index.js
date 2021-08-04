const express = require("express");
const xtorrent = require('xtorrent');
const cors = require("cors");

var allowedOrigins = ['http://localhost:3000', 'https:tracehdmovies.com'];

const app = express();

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


const port = process.env.PORT || "8000";

app.get("/", async (req, res) => {
    xtorrent.search({
        query: req.name ,
        orderBy: 'time',
        sortBy: 'desc',
        page: 2,
    }).then(data => {
        res.send(data);
     });
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
