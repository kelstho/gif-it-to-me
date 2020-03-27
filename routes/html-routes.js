// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
//var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.post("/api/newGame", function(req, res) {
    var newGameName = req.body;
    db.create(["gameName"], [newGameName], function(result) {
      res.json({ id: result.insertId });
    });
  });
  app.post("/api/submitMeme", function(req, res) {
    db.create(
      ["gameBoard", "position", "meme"],
      [req.body.boardName, req.body.postion, req.body.meme],
      function(result) {
        if (result.changedRows === 0) {
          return res.status(404).end();
        }
        res.status(200).end();
      }
    );
  });
  app.get("/gameBoard", function(req, res) {
    app.gameName = req.query.gameName;
    res.sendFile(path.join(__dirname, "../public/gameboard.html"));
    db.Game.findOne({ boardName: app.gameName });
    // res.json({
    //   gameName: req.query.gameName
    // });
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
    db.create(
      ["gameName", "playerNum"],
      [gameData.boardName, gameData.playerNum],
      function(result) {
        if (result.changedRows === 0) {
          return res.status(404).end();
        }
        res.redirect(
          "http://localhost:8080/gameboard?gameName=" +
            gameData.boardName +
            "&playerName=Player1"
        );
      }
    );
  });
  var playerNames = ["Player2", "Player3", "Player4", "Player5", "Player6"];
  var i = 0;
  app.post("/join", function(req, res) {
    var gameData = req.body;
    db.create(
      ["gameName", playerNames[i]],
      [gameData.boardName, gameData.playerName],
      function(result) {
        if (result.changedRows === 0) {
          return res.status(404).end();
        }
        res.redirect(
          "http://localhost:8080/gameboard?gameName=" +
            gameData.boardName +
            "&playerName=" +
            playerNames[i]
        );
      }
    );
    i++;
  });
};
