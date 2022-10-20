import authentication from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:3035', {
  transports: ['websocket'],
  forceNew: true,
});
const client = feathers();
client.configure(socketio(socket, { timeout: 700000 }));
client.configure(
  authentication({
    storage: window.localStorage,
  }),
);

export default client;
