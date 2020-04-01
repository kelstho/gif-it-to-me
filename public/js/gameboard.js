/* eslint-disable indent */
$(document).ready(function() {
  webAddress = "http://localhost:8080";
  var socket = io.connect(webAddress);
  socket.on("game1", function(data) {
    console.log(data);
    switch (data.message) {
      case "captions":
        if (data.player !== player.handle) {
          if (!captions.caption1) {
            captions.caption1 = data;
          } else if (!captions.caption2) {
            captions.caption2 = data;
          } else if (!captions.caption3) {
            captions.caption2 = data;
          } else if (!captions.caption4) {
            captions.caption2 = data;
          } else if (!captions.caption5) {
            captions.caption2 = data;
          }
        }
        break;
      case "winner":
        $("#players-wait").modal("close");
        $("#round-winner-player").text(data.player);
        $("#round-winner-caption").text(data.caption);
        $("#round-winner").modal("open");
        if (player.handle === data.player) {
          player.judge = true;
        }
        var space = $("#gif-" + activeSpace.value);
        space.empty();
        var img = $("<img>");
        img.attr({
          src: "https://media.giphy.com/media/" + data.gif + "/giphy_s.gif",
          class: "gif-div"
        });
        space.append(img);
        $(".player-space").attr("class", "player-space");
        var gameOver = false;
        data.allPlayers.forEach(function(player) {
          $("#s" + player.currentspacevalue + "-p" + player.id).attr(
            "class",
            "player-space " + player.name
          );
          if (player.currentspacevalue === 10) {
            gameOver = true;
          }
        });
        setTimeout(function() {
          $("#round-winner").modal("close");
          if (gameOver) {
            $("#champ").text(data.player + " Wins The Game!!!");
            $("#game-winner").modal("open");
          } else {
            startRound();
          }
        }, 10000);
        break;
      case "judge":
        if (data.judge) {
          $("#first-judge-player").text(data.player);
        }
        break;
    }
  });

  var captions;

  var activeSpace = {
    id: 0,
    value: 0
  };

  var player = {
    handle: "player x",
    caption: "",
    judge: false
  };

  var playerData = JSON.parse(localStorage.getItem("playerData"));
  player.handle = playerData.playerName;
  $("#declarePlayer").text("Welcome " + player.handle);

  $("#ready-modal").modal({
    onCloseEnd: function() {
      console.log("modal closed");
    },
    dismissable: false
  });

  $("#waiting-modal").modal({
    onCloseEnd: function() {
      console.log("modal closed");
    }
  });

  $("#first-judge").modal({
    onCloseEnd: function() {
      console.log("modal closed");
    },
    dismissable: false
  });

  $("#write-modal").modal({
    onCloseEnd: function() {
      console.log("modal closed");
    },
    dismissable: false
  });

  $("#judge-waits").modal({
    onCloseEnd: function() {
      console.log("modal closed");
    }
  });

  $("#judge-modal").modal({
    onCloseEnd: function() {
      console.log("modal closed");
    },
    dismissable: false
  });

  $("#players-wait").modal({
    onCloseEnd: function() {
      console.log("modal closed");
    }
  });

  $("#round-winner").modal({
    onCloseEnd: function() {
      console.log("modal closed");
    }
  });

  $("#game-winner").modal({
    onCloseEnd: function() {
      console.log("modal closed");
    }
  });

  //on load populate spaces

  function makeBoard(gif) {
    var space = $("#gif-" + gif.value);
    var img = $("<img>");
    img.attr({
      src: "https://media.giphy.com/media/" + gif.gif + "/giphy_s.gif",
      class: "gif-div"
    });
    space.text("");
    space.append(img);
  }

  $.get("/api/newGame", playerData).then(function(result) {
    switch (result.maxPlayers) {
      case 3:
        captions = {
          caption1: false,
          caption2: false
        };
        break;
      case 4:
        captions = {
          caption1: false,
          caption2: false,
          caption3: false
        };
        break;
      case 5:
        captions = {
          caption1: false,
          caption2: false,
          caption3: false,
          caption4: false
        };
        break;
      case 6:
        captions = {
          caption1: false,
          caption2: false,
          caption3: false,
          caption4: false,
          caption5: false
        };
        break;
    }
    var currentJudge = "Player" + result.judgeid;
    if (player.handle === currentJudge) {
      player.judge = true;
    }
    result.Spaces.forEach(makeBoard);
    $("#ready-modal").modal("open");
  });

  //ready up
  $(document).on("click", "#player-ready", function() {
    player.caption = "ready";
    socket.emit("game1", {
      message: "captions",
      player: player.handle,
      caption: player.caption
    });
    var readycheck = setInterval(function() {
      var isReady = true;
      for (key in captions) {
        if (!captions[key]) {
          isReady = false;
        }
      }
      if (isReady) {
        startRound();
        clearInterval(readycheck);
      }
    }, 1000);
  });

  //start round trigger
  function startRound() {
    socket.emit("game1", {
      message: "judge",
      player: player.handle,
      judge: player.judge
    });
    for (key in captions) {
      captions[key] = false;
    }
    $("#first-judge").modal("open");
    $.get("/api/getSpace", playerData).then(function(response) {
      activeSpace.id = response.id;
      activeSpace.value = response.value;
      console.log(response);
      $(".moving-gif").attr(
        "src",
        "https://media.giphy.com/media/" + response.gif + "/giphy.gif"
      );
    });
    setTimeout(function() {
      $("#first-judge").modal("close");
      captioning();
    }, 5000);
  }

  //caption phase
  function captioning() {
    if (player.judge) {
      $("#judge-waits").modal("open");
      var captionWait = setInterval(function() {
        var isReady = true;
        for (key in captions) {
          if (!captions[key]) {
            isReady = false;
          }
        }
        if (isReady) {
          clearInterval(captionWait);
          $("#judge-waits").modal("close");
          judging();
        }
      });
    } else {
      $("#write-modal").modal("open");
      var time = 40;
      var timer = setInterval(function() {
        $(".timer").text(time);
        time = --time;
      }, 1000);
      setTimeout(function() {
        player.caption = $("#caption").val();
        clearInterval(timer);
        $("#write-modal").modal("close");
        socket.emit("game1", {
          message: "captions",
          player: player.handle,
          caption: player.caption
        });
        console.log(caption);
        judging();
      }, 41000);
    }
  }

  //judge phase
  function judging() {
    var capNum = 1;
    for (key in captions) {
      if (captions[key]) {
        $("#caption-" + capNum).text(captions[key].caption);
        $("#caption-" + capNum).attr("dataPlayer", captions[key].player);
        capNum = ++capNum;
      }
    }
    if (player.judge) {
      $("#judge-modal").modal("open");
    } else {
      $("#players-wait").modal("open");
    }
  }

  $(document).on("click", ".judging-caption", function() {
    var winner = $(this).attr("dataPlayer");
    var bestCaption = $(this).text();
    $.ajax({
      url:
        "http://api.giphy.com/v1/gifs/random?api_key=6o5OpL93nQFs2S386QaG6q1GPN1r02Ky"
    }).then(function(result) {
      var gifAdjust = result.data.id;
      $.ajax({
        url: "/api/roundEnd",
        method: "PUT",
        data: {
          player: winner,
          gif: gifAdjust,
          lastSpace: activeSpace.id,
          boardName: playerData.boardName
        }
      }).then(function(response) {
        console.log(response);
        $("#judge-modal").modal("close");
        socket.emit("game1", {
          message: "winner",
          player: winner,
          caption: bestCaption,
          allPlayers: response.Players,
          gif: gifAdjust
        });
      });
    });
  });

  //winner declaration
  //game win check

  //game winner
});
