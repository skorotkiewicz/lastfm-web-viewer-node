const express  = require('express');
const logger   = require('morgan');
const path     = require('path');
const swig     = require('swig');
const moment   = require('moment');
const website  = require('./routes/lastfm')
const app      = express();

if (process.env.NODE_ENV == 'production') {
  app.use(logger('dev'));
}

app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static( path.join(__dirname, 'public'), { maxAge: 3600000 } )); // 3600000msec == 1hour

swig.setFilter('elapsed', function(value) {
    return moment(value*1000).fromNow()
});

//Route Prefixes
app.use('/', website);

// handle errors
if (process.env.NODE_ENV == 'production') {
  // eslint-disable-next-line no-unused-vars
  app.use(function(err, req, res, next) {
    if (err.status === 500)
        res.status(500).json({ message: "Something looks wrong" });
    else
        res.status(500).json({ message: "Something looks wrong" });
  });
}

// throw 404 if URL not found
app.all("*", function(req, res) {
  return res.status(404).json({ message: "Page not found" });
});

app.listen(3000, function() {
  console.log('Node server listening on port 3000');
});
