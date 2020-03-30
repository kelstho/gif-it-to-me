$(document).ready(function() {
  $(".modal").modal();

  $("#start-button").on("click", function() {
    var myBoard = $("#make-game-input")
      .val()
      .trim();
    var players = $("#how-many-players")
      .val()
      .trim();
    var boardData = {
      boardName: myBoard,
      playerNum: players
    };
    $.post("/creategame", boardData);
  });

  $("#join-button").on("click", function() {
    var gameID = $("#join-game-input")
      .val()
      .trim();
    var gameData = {
      boardName: gameID
    };
    $.post("/join", gameData);
  });
});
