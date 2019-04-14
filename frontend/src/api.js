import openSocket from 'socket.io-client';
const socket = openSocket('http://shared-paper.herokuapp.com');
// http://shared-paper.herokuapp.com
// http://10.104.86.58:3000/

const signUpDB = (username, password, cb) => {
  socket.emit('users/signup', username, password, cb);
};

const loginDB = (username, password, cb) => {
  socket.emit('users/login', username, password, cb);
};

const getPapers = cb => {
  socket.emit('users/get_papers', cb);
};

const getCanvas = (name, cb) => {
  socket.emit('paper/connection', name, cb);
};

const subscribeToCanvas = (addCb, deleteCb, clearCb) => {
  socket.on('paper/add_path', addCb);
  socket.on('paper/delete_path', deleteCb);
  socket.on('paper/clear', clearCb);
};

const removeCanvas = canvas => {
  socket.emit('users/delete_paper', canvas);
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

export {
  subscribeToCanvas,
  addPathToCanvas,
  clearAll,
  undoPath,
  getCanvas,
  getPapers,
  removeCanvas,
  signUpDB,
  loginDB
};
