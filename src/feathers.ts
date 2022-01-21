import authentication from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const url =
  'http://ubuntu@ec2-3-8-150-201.eu-west-2.compute.amazonaws.com:8080';
const socket = io(url, {
  transports: ['websocket'],
  forceNew: true,
});
const client = feathers();
client.configure(socketio(socket, { timeout: 700000 }));
client.configure(
  authentication({
    storage: window.localStorage,
  })
);

export default client;
