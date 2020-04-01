// Requiring necessary npm packages
var express = require("express");
var socket = require("socket.io");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Requiring our routes
require("./routes/html-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: true }).then(function() {
  var server = app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

  var io = socket(server);

  io.on("connection", function(socket) {
    console.log("game name " + app.gameName);
    console.log("made connection", socket.id);

    socket.on("game1", function(data) {
      //NEED TO change this!! This is for all sockets
      io.sockets.emit("game1", data);
    });
    //socket.on(app.gameName, function(data) {
    socket.on("caption", function(data) {
      console.log(data.handle + " " + data.caption);
      // db.create(
      //   ["gameName", "playerWinner"],
      //   [data.boardName, data.playerWinner],
      //   function(result) {
      //     if (result.changedRows === 0) {
      //       //what to do with error here
      //       //return res.status(404).end();
      //       //
      //     }

      //     });
      io.sockets.emit("game1", {
        //could use app.gameName here but hardcoded for now
        judge: "Player1",
        player: data.handle,
        caption: data.caption
      });

      //io.sockets.emit(app.gameName, data);
    });
  });
});
