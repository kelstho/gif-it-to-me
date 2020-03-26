$(document).ready(function() {

  webAddress = "http://localhost:8080/gameBoard";
  var socket = io.connect(webAddress);

  var message = document.getElementById("message");
  handle = document.getElementById("handle");
  btn = document.getElementById("send");
  output = document.getElementById("output");

  var queryString = window.location.search;

  console.log("query" + queryString);
  var urlParams = new URLSearchParams(queryString);
  var qVal = urlParams.get("gameName");
  console.log("qval" + qVal);
  btn.addEventListener("click", function() {
    socket.emit("chat", {
      message: message.value,
      handle: handle.value
    });
  });

  socket.on("chat", function(data) {
    output.innerHTML += "<p>" + data.handle + ":" + data.message + "</p>";
  });
  console.log("test");

  // opens all modals
  $(".modal").modal();
  // opens ready button modal upon game start
  $("#ready-modal").modal("open");
});
