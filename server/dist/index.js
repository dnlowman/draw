"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = require("http");
const dotenv_1 = require("dotenv");
const EventTypes_1 = __importDefault(require("./EventTypes"));
dotenv_1.config();
// @ts-ignore
const { log, warn, error } = console;
// @ts-ignore
const { freeze } = Object;
log(`Starting draw server....`);
log(`Port: ${(_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.PORT}`);
const app = express_1.default();
app.set("port", (_c = (_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.PORT) !== null && _c !== void 0 ? _c : 3000);
const http = new http_1.Server(app);
const io = socket_io_1.default(http);
const rooms = [];
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve("./client/index.html"));
});
io.on("connection", (socket) => {
    log(`[!] Socket connecting: ${socket.id}`);
    socket.on('disconnecting', () => {
        log(`[!] Socket disconnecting: ${socket.id}`);
    });
    socket.on('disconnect', () => {
        log(`[!] Socket disconnected: ${socket.id}`);
    });
    socket.on(EventTypes_1.default.CREATE_ROOM, (msg) => {
        log(`[!] Creating room: ${socket.id}`);
    });
});
http.listen(3000, () => {
    console.log("listening on *:3000");
});
/*

  // sending to the client
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  // sending to all clients except sender
  socket.broadcast.emit('broadcast', 'hello friends!');

  // sending to all clients in 'game' room except sender
  socket.to('game').emit('nice game', "let's play a game");

  // sending to all clients in 'game1' and/or in 'game2' room, except sender
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

  // sending to all clients in 'game' room, including sender
  io.in('game').emit('big-announcement', 'the game will start soon');

  // sending to all clients in namespace 'myNamespace', including sender
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

  // sending to a specific room in a specific namespace, including sender
  io.of('myNamespace').to('room').emit('event', 'message');

  // sending to individual socketid (private message)
  io.to(socketId).emit('hey', 'I just met you');

  // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
  // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

  // sending with acknowledgement
  socket.emit('question', 'do you think so?', function (answer) {});

  // sending without compression
  socket.compress(false).emit('uncompressed', "that's rough");

  // sending a message that might be dropped if the client is not ready to receive messages
  socket.volatile.emit('maybe', 'do you really need it?');

  // specifying whether the data to send has binary data
  socket.binary(false).emit('what', 'I have no binaries!');

  // sending to all clients on this node (when using multiple nodes)
  io.local.emit('hi', 'my lovely babies');

  // sending to all connected clients
  io.emit('an event sent to all connected clients');

*/
//# sourceMappingURL=index.js.map