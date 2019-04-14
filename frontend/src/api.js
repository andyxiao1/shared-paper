import openSocket from 'socket.io-client';
const socket = openSocket('http://10.104.86.58:3000/');

const getCanvas = cb => {
  socket.emit('paper/connection', 'andy', cb);
};

const subscribeToCanvas = (addCb, deleteCb, clearCb) => {
  socket.on('paper/add_path', addCb);
  socket.on('paper/delete_path', deleteCb);
  socket.on('paper/clear', clearCb);
};

const addPathToCanvas = path => {
  socket.emit('paper/add_path', path);
};

const clearAll = () => {
  socket.emit('paper/clear');
};

const undoPath = id => {
  socket.emit('paper/delete_path', id);
};

export { subscribeToCanvas, addPathToCanvas, clearAll, undoPath, getCanvas };
