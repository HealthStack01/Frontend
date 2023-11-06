import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import authentication from "@feathersjs/authentication-client";

const herok = "https://healthstack-backend.herokuapp.com";
const azure = "https://hsbackend.azurewebsites.net";
const url = "http://localhost:3035";
const herok1="https://hs-backend-59a793db48af.herokuapp.com/"
const API =
  process.env.NODE_ENV !== "production"
    ? url
    : "https://healthstack-backend.herokuapp.com";
const socket = io(azure, {
  transports: ["websocket"],
  forceNew: true,
});

const client = feathers();
client.configure(socketio(socket, {timeout: 700000000})); //700000
client.configure(
  authentication({
    storage: window.localStorage,
  })
);

export default client;
