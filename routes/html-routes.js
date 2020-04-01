// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
//var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //newGame will used the passed object to create a new row in database ???
  app.post("/api/newGame", function(req, res) {
    var newGameName = req.body;
    db.create(["gameName"], [newGameName], function(result) {
      res.json({ id: result.insertId });
    });
  });
  //submitMeme requires the boardName, position, and meme be passed in
  //if it doesn't it'll return a 404, else 200
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
  //gameboard will serve gameboard.html regardless of what is passed
  app.get("/gameBoard", function(req, res) {
    app.gameName = req.query.gameName;
    res.sendFile(path.join(__dirname, "../public/gameboard.html"));
    db.Game.findOne({ boardName: app.gameName });
  });
  //getSpace returns the row of db Space where currentJudge equals
  //the parameter that was passed in
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
  //creategame use parameters passed after? and needs to have boardName
  //playerNum. That then creates a row in db ???
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
  //join uses parameters passed after ? and needs to have boardName and
  //playerName. Then creates a row in db ????
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
  //playerspaces finds all rows in and database spaces, and joins
  //on games, and returns all rows
  app.get("/api/playerspaces", function(req, res) {
    //return table spaces column gif and Gameid/
    //join table games and send judgeId
    db.Space.findAll({
      include: [
        {
          model: Game
        }
      ]
    }).then(function(data) {
      res.json(data);
    });
  });
  //roundend takes object passed in on the url ? needs to have judgeId
  //and boardName. So roundend?judgeId=1&boardName=exampleBoard
  app.put("/api/roundEnd", function(req, res) {
    //sending ID of winner, and GIF id
    //update games judgeId/
    //update spaces gif
    db.Game.update(
      { judgeId: req.body.judgeId },
      { where: { boardname: req.body.boardName } }
    ).then(function() {
      res.json(req.body);
    });

    //return judgeId and gif
  });
};
