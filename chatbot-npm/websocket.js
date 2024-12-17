import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const webserver = express();
webserver.listen(3000, () => console.log(`Listening on port 3000`));
webserver.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});
webserver.get("/style.css", (req, res) => {
  res.sendFile("style.css", { root: __dirname });
});

webserver.get("/Ravel.js", (req, res) => {
  res.sendFile("../Ravel.js", { root: __dirname });
});
 webserver.use('/node_modules',express.static(path.join(__dirname , 'node_modules')));
 webserver.use('/public', express.static(path.join(__dirname, 'public')));


function qID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

import { WebSocketServer } from "ws";
import { Ravel } from "../Ravel.js";

var lookup = {};
const sockserver = new WebSocketServer({ port: 443 });
sockserver.on("connection", (ws) => {
  console.log("merhaba")
  if (!ws.clientID) {
    ws.clientID = qID();
    lookup[ws.clientId] = ws; //assign client id
    console.log(`Client connected : ${ws.clientID}`);
  }
  //data from clients
  ws.on("message", function incoming(message) {
    console.log("Gelen mesaj: %s", message);

    const data = JSON.parse(message);

    if (data.action === "get_uid") {
      ws.send(JSON.stringify({ action: "set_uid", clientID: ws.clientID }));
    }
    if (data.action === "send_message") {
      chatbot = Ravel(data.message);

      lookup[data.clientID].send(
        JSON.stringify({
          action: "receive_message",
          sender: "server-chatbot",
          intent: chatbot.intent,
          value: chatbot.value,
        })
      );
    }
  });

  ws.on("close", () => {
    console.log(`Client ${ws.clientId} has disconnected!`);
  });

  ws.onerror = function () {
    console.log("WebSocket error");
  };
});

//   let example = {
//     action:"receive_message",
//     message:"",
//     execute:"innerclient",
//     func: functionobj;
//   }

//   function FunctionHandler(FunctionObj){

//     eval()

//   }
