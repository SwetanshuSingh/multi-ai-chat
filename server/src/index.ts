import http, { IncomingMessage } from "http";
import express from "express";
import { WebSocketServer } from "ws";
import url from "url";

function authenticateUpgrade(request: IncomingMessage) {
  // get the jwt token or cookie from the header
  // verify the token or cookie against the database
  // if user exists return the user to socket server upgrade connection.
  
  const authHeader = request.headers.authorization;

  if (!authHeader || authHeader !== "secret-code") return null;

  if (!request || !request.url) return null;
  const { query } = url.parse(request.url, true);

  console.log("User query params", query);

  return query;
}

const app = express();

const server = http.createServer(app);

app.use(express.json());

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws, request) => {
  ws.send("You are connected to socket server");
});

app.get("/auth", (req, res) => {
  res.json({ message: "This route works" });
});

server.on("upgrade", (request, socket, head) => {
  if (!request || !request.url) return;

  const { pathname } = url.parse(request.url, true);

  if (pathname !== "/ws") {
    socket.destroy();
    return;
  }

  const user = authenticateUpgrade(request);

  if (!user) {
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request, user);
  });
});

server.listen(3000, () => {
  console.log("The server is running on PORT 3000");
});
