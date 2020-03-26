$(document).ready(function() {
  
  $("#start-button").on("click", function () {
    let newBoard = $("#make-game-input").val().trim();
    let players = $("#how-many-players").val().trim();
    let boardData = {
      boardName : newBoard,
      playerNum : players
    };
    $.post("/creategame", boardData);
  });

  $("#join-button").on("click", () => {
    let gameID = $("#join-game-input").val().trim();
    let gameData = {
      boardName : gameID
    };
    $.post("/join", gameData);
  });
});
