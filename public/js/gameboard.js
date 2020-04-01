$(document).ready(function() {
  webAddress = "http://localhost:8080";
  var socket = io.connect(webAddress);
  socket.on("game1", function(data) {
    console.log(data.judge + " " + data.player + " " + data.caption);
    //judging();
    //trigger judging here if data.judge = the player that is the judge????
  });

  var captions = {
    caption1: {
      player: "player1",
      caption: "How I felt watching Game of Thrones season 1"
    },
    caption2: {
      player: "player2",
      caption:
        "Be careful ,son. I hear this golf course eats annoying little brats."
    },
    caption3: {
      player: "player3",
      caption: "Ever wonder how someone develops a phobia of golf?"
    },
    caption4: false,
    caption5: false
  };

  var player = {
    handle: "player x",
    caption: "",
    judge: false
  };

  var playerData = JSON.parse(localStorage.getItem("playerData"));
  player.handle = playerData.playerName;

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
  // $(".modal").modal();

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
    result.Spaces.forEach(makeBoard);
  });

  // $.get("/api/getGifs").then(function(response) {
  //   console.log(response);
  //   response.forEach(makeBoard);
  // });

  //ready up
  $(document).on("click", "#ready", function() {
    // socket.emit("caption", {
    //   player: player.handle,
    //   caption: player.caption
    // });
  });

  //start round trigger
  function startRound() {
    $("#first-judge").modal("open");
    // $.get("/api/getSpace").then(function(response) {
    //   $(".moving-gif").attr("src", response.gif);
    // })
    $(".moving-gif").attr(
      "src",
      "https://media.giphy.com/media/3VAQRS2XmgF1u/giphy.gif"
    );
    setTimeout(function() {
      $("#first-judge").modal("close");
      captioning();
    }, 5000);
  }

  //caption phase
  function captioning() {
    $("#write-modal").modal("open");
    var time = 40;
    var timer = setInterval(function() {
      $(".timer").text(time);
      time = --time;
    }, 1000);
    setTimeout(function() {
      caption = $("#caption").val();
      clearInterval(timer);
      $("#write-modal").modal("close");
      socket.emit("caption", {
        player: player.handle,
        //changed this from player.handle, and player.caption
        caption: caption
      });
      console.log(caption);
      judging();
    }, 41000);
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
    $("#judge-modal").modal("open");
  }

  $(document).on("click", ".judging-caption", function() {
    var winner = $(this).attr("dataPlayer");
    console.log(winner);
    $("#judge-modal").modal("close");
  });

  startRound();

  //winner declaration
  //game win check

  //game winner

  // opens ready button modal upon game start
  // $("#ready-modal").modal("open");
});

//other routes
//  /api/roundEnd
//updates judge, space, and gif
//  /api/roundStart
//returns all players in the current game and their currentspacevalues as well as the current judge of the game
//  /api/gameOver
//deletes all table info related to the current game
