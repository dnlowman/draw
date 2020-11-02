"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const app = express();
app.set("port", process.env.PORT || 3000);
let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./client/index.html"));
});
// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function (socket) {
    console.log(socket);
    console.log(socket.user);
    console.log(socket.id);
    console.log("a user connected");
});
const server = http.listen(3000, function () {
    console.log("listening on *:3000");
});
//# sourceMappingURL=index.js.map