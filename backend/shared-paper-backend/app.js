const bcrypt = require('bcrypt');
require('dotenv').config();
var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
const saltRounds = bcrypt.genSaltSync(10);

const port = process.env.PORT || 3000;

var server = http.createServer(app);
server.listen(port);
var io = require('socket.io')(server);

console.log('Server started on port ' + port);

const MongoClient = require('mongodb').MongoClient;

// Will 404 if you try to access using HTTP
app.get('*', (req, res) => {
    res.send('i am so tired');
});

// Connect to MongoDB database
MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(client => {

        const db = client.db();
        const papers = db.collection('papers');
        const users = db.collection('users');
        
        io.on('connection', socket => {
            
            console.log('User connected');

            // Inital connection
            socket.on('paper/connection', (paperName, callback) => {

                console.log('Connecting to ' + paperName);
                
                socket.join(paperName);
                socket.paper = paperName;

                var username = 'andy';

                if(socket.user) { username = socket.user; }
                
                users.updateOne(
                    { name: username, papers: { $nin: [ paperName ] } },
                    { $push: { papers: paperName } }
                );

                // get all paths                
                papers.findOne({ name: socket.paper })
                    .then(paper => {
                        callback(paper.paths);
                    })
                    .catch(err => {
                        console.log("Error: " + err);
                    });
            });

            socket.on('paper/add_path', (pathObj) => {
                
                papers.updateOne(
                    { 'name': socket.paper },
                    { '$push': { 'paths': pathObj }},
                    { upsert: true }    // insert if not exists
                ).catch(err => {
                    console.log(err);
                });

                socket.to(socket.paper).emit('paper/add_path', pathObj);
            });

            socket.on('paper/delete_path', pathID => {

                papers.updateOne(
                    { 'name': socket.paper },
                    { '$pull': { 'paths': { 'path.id': pathID }}}
                );

                socket.to(socket.paper).emit('paper/delete_path', pathID);
            });

            socket.on('paper/clear', () => {

                papers.updateOne(
                    { 'name': socket.paper },
                    { '$set': { 'paths': [] }}
                );

                socket.to(socket.paper).emit('paper/clear');
            });

            socket.on('users/get_papers', (callback) => {

                var username = socket.user || 'andy';
                
                users.findOne({ name: username })
                    .then(user => {
                        callback(user.papers);
                    });
            });

            socket.on('users/delete_paper', (paperName) => {

                var username = socket.user || 'andy';

                users.updateOne(
                    { name: username },
                    { $pull: { papers: paperName } }
                );

            });

            socket.on('users/signup' , (username, password, callback) => {

                users.findOne({ name: username })
                    .then(user => {
                        if(!user) {

                            console.log('inserting ');

                            var hashed = bcrypt.hashSync(password, saltRounds);

                            users.insertOne({
                                name: username,
                                password: hashed,
                                papers: []
                            });

                            socket.user = username

                            callback(true);
                        } else {
                            callback(false);
                        } 
                    })
                    .catch(err => {
                        console.log(err);
                    });
                
            })

            socket.on('users/login' , (username, password, callback) => {

                users.findOne({ name: username })
                    .then(user => {

                        if(user) {

                            var result = bcrypt.compareSync(password, user.password);
                            callback(result); //true or false

                            if(result) {
                                socket.user = username
                            }else {
                                console.log("no pt 2");
                            }
                        } else {
                            console.log("no");
                            callback(false);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
        });

    })
    .catch(err => {
        console.log(err);
    });

module.exports = app;
