const WebScoket = require("ws");
const wss = new WebScoket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log(data);
    ws.send(data + "Hello");
  });

  ws.on("close", () => {
    console.log("one people logout");
  });
});

/*
const ws = new WebSocket("ws://localhost:3000");

ws.onopen = function (evt) {
  console.log("Connection open....");
  ws.send("Hello WebScoket");
};

ws.onmessage = function (evt) {
  console.log("Received Message: " + evt.data);
};

ws.onclose = function (evt) {
  console.log("Connection closed");
};
*/
