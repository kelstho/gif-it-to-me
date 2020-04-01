/* eslint-disable indent */
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
  //getSpace returns the row of db Space where currentJudge equals
  //the parameter that was passed in
  app.get("/api/getSpace", function(req, res) {
    db.Game.findOne({
      where: {
        boardName: req.query.boardName
      }
    }).then(function(result) {
      db.Player.findOne({
        where: {
          name: "Player" + result.judgeid
        }
      }).then(function(result) {
        db.Space.findOne({
          where: {
            value: result.currentspacevalue,
            GameId: result.GameId
          }
        }).then(function(result) {
          res.json(result);
        });
      });
    });
  });
  //creategame use parameters passed after? and needs to have boardName
  //playerNum. That then creates a row in db ???
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
  //roundend takes object passed in on the url ? needs to have judgeId
  //and boardName. So roundend?judgeId=1&boardName=exampleBoard
  app.put("/api/roundEnd", function(req, res) {
    var judgeUpdate;
    switch (req.body.player) {
      case "Player1":
        judgeUpdate = 1;
        break;
      case "Player2":
        judgeUpdate = 2;
        break;
      case "Player3":
        judgeUpdate = 3;
        break;
      case "Player4":
        judgeUpdate = 4;
        break;
      case "Player5":
        judgeUpdate = 5;
        break;
      case "Player6":
        judgeUpdate = 6;
        break;
    }
    db.Space.update(
      { gif: req.body.gif },
      { where: { id: req.body.lastSpace } }
    ).then(function(result) {
      console.log(result);
      db.Game.update(
        { judgeid: judgeUpdate },
        { where: { id: req.body.boardName } }
      ).then(function(result) {
        console.log(result);
        db.Player.findOne({
          where: { name: req.body.player }
        }).then(function(result) {
          var adjustedValue = 1 + result.currentspacevalue;
          db.Player.update(
            { currentspacevalue: adjustedValue },
            { where: { id: result.id } }
          ).then(function(result) {
            console.log(result);
            db.Game.findOne({
              where: {
                boardName: req.body.boardName
              },
              include: db.Player
            }).then(function(result) {
              res.json(result);
            });
          });
        });
      });
    });
  });
};
