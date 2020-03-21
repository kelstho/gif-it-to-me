webAddress = "http://localhost:8080";
var socket = io.connect(webAddress);

var message = document.getElementById("message");
handle = document.getElementById("handle");
btn = document.getElementById("send");
output = document.getElementById("output");

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
