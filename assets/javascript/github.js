var express = require('express');

var app = express();
app.use(express.static('public'));

var port = process.env.PORT || 8888;

// routes

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});