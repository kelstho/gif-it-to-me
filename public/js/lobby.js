$(document).ready(function() {
  $(".modal").modal();

  $("#start-button").on("click", function() {
    var myBoard = $("#make-game-input")
      .val()
      .trim();
    var players = $("#how-many-players")
      .val()
      .trim();
    $.ajax({
      url:
        "http://api.giphy.com/v1/gifs/trending?api_key=6o5OpL93nQFs2S386QaG6q1GPN1r02Ky"
    }).then(function(gifs) {
      var boardData = {
        boardName: myBoard,
        playerNum: players,
        gifs: {}
      };
      for (i = 0; i < 9; i++) {
        boardData.gifs[i] = gifs.data[i].id;
      }
      $.post("/creategame", boardData).then(function(result) {
        var playerData = JSON.stringify(result);
        localStorage.setItem("playerData", playerData);
        window.location.href = "/gameboard";
      });
    });
  });

  $("#join-button").on("click", function() {
    var gameID = $("#join-game-input")
      .val()
      .trim();
    $.get("/join/" + gameID).then(function(result) {
      var playerData = JSON.stringify(result);
      localStorage.setItem("playerData", playerData);
      window.location.href = "/gameboard";
    });
  });
});
