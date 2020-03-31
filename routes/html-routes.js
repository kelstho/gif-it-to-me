// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
//var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/api/newGame", function(req, res) {
    console.log(req.query);
    db.Game.findOne({
      where: {
        boardName: req.query.boardName
      },
      include: db.Space
    }).then(function(result) {
      res.json(result);
    });
  });
  app.get("/gameBoard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/gameboard.html"));
  });
  app.get("/api/getSpace", function(req, res) {
    db.Space.findOne({
      where: {
        currentJudge: req.params.currentJudge
        //this returns the current Judge?????
        //update this for what this query is for.
      }
    }).then(function(result) {
      res.json(result);
    });
  });
  app.post("/creategame", function(req, res) {
    var gameData = req.body;
    db.Game.create({
      boardName: gameData.boardName,
      maxPlayers: gameData.playerNum
    }).then(function(result) {
      myGifs = [];
      var i = 1;
      gameData.gifs.forEach(function(myGif) {
        var tempGif = {
          gif: myGif,
          value: i,
          GameId: result.dataValues.id
        };
        myGifs.push(tempGif);
        i = ++i;
      });
      console.log(myGifs);
      db.Space.bulkCreate(myGifs);
      res.redirect("/join/" + result.dataValues.boardName);
    });
  });
  app.get("/join/:boardName", function(req, res) {
    db.Game.findOne({
      where: {
        boardName: req.params.boardName
      },
      include: db.Player
    }).then(function(result) {
      var myPlayer = 1 + result.Players.length;
      if (result.Players.length < result.dataValues.maxPlayers) {
        db.Player.create({
          name: "Player" + myPlayer,
          GameId: result.dataValues.id
        }).then(function(addPlayer) {
          var response = {
            boardName: result.dataValues.boardName,
            playerName: addPlayer.dataValues.name
          };
          res.json(response);
        });
      } else {
        res.status(405).end();
      }
    });
  });
};
