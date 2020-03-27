$(document).ready(function() {
  // webAddress = "http://localhost:8080/gameBoard";
  // var socket = io.connect(webAddress);

  // btn.addEventListener("click", function() {
  //   socket.emit("chat", {
  //     message: message.value,
  //     handle: handle.value
  //   });
  // });

  socket.on("caption", function(data) {
    for (key in captions) {
      if (!captions[key]) {
        caption[key] = data;
        return;
      }
    }
  });

  var form = $("#captions-form");

  var captions = {
    caption1: {
      player: "player1",
      caption: "a"
    },
    caption2: {
      player: "player2",
      caption: "b"
    },
    caption3: {
      player: "player3",
      caption: "c"
    },
    caption4: false,
    caption5: false,
    caption6: false
  };

  var player = {
    handle: "player x",
    caption: "",
    judge: false
  };

  // $("#write-modal").modal({
  //   onCloseEnd: function() {
  //     console.log("modal closed");
  //   }
  // })
  $(".modal").modal();

  //ready up
  $(document).on("click", "#ready", function() {
    //socket instead
    //prevent modal close
  });

  //on load populate spaces
  $.get("/api/getGifs").then(function(response) {
    console.log(response);
  });

  //start round trigger
  function startRound () {
    $("#new-judge").modal("open");
    $("#caption-form").append();
  }

  //caption phase
  function captioning() {
    $("#write-modal").modal("open");
    var time = 40;
    var timer = setInterval(function() {
      $(".timer").text(time);
      time = --time
    }, 1000);
    setTimeout(function() {
      player.caption = $("#textarea1").val();
      clearInterval(timer);
      $("#write-modal").modal("close");
      socket.emit("caption", {
        player: player.handle,
        caption: player.caption
      });
      console.log(player.caption);
    }, 41000);
  }

  //judge phase
  function judging() {
    // for (key in captions) {
    //   if (captions[key]) {
    //     var p = $("<p>");
    //     var label = $("<label>");
    //     var input = $("<input>");
    //     var span = $("<span>");
    //     var br = $("<br>");
    //     label.attr({ class: "filed-in", type: "checkbox" });
    //     p.attr({ class: "caption-option", id: captions[key].player });
    //     span.text(captions[key].caption);
    //     input.append(span);
    //     label.append(input);
    //     p.append(label);
    //     form.append(p);
    //     form.append(br);
    //   }
    // };
    // $("#mySpan").attr({ class: "caption-option", dataPlayer: "player1" });
    // $("#mySpan").text("hello!");
    $("#judge-modal").modal("open");
  };

  $(document).on("click", ".caption-option", function() {
    var winner = $(this).attr("dataPlayer");
    console.log(winner);
  });

  judging();

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
