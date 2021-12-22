import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

var URL = process.env.URL || "http://localhost:3030";
const socket = io(URL);
const client = feathers();

client.configure(socketio(socket));
client.configure(
  feathers.authentication({
    storage: window.localStorage,
  })
);

export default client;
