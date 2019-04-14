require('dotenv').config();
var http = require('http');
var express = require('express');
var path = require('path');
var app = express();

const port = process.env.PORT || 3000;

var server = http.createServer(app);
server.listen(port);
var io = require('socket.io')(server);

console.log('Server started on port ' + port);

const MongoClient = require('mongodb').MongoClient;

// Will 404 if you try to access using HTTP
app.get('*', (req, res) => {
    res.json(paths_arr);
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
                
                socket.join(paperName);
                socket.paper = paperName;

                users.updateOne(
                    { name: socket.username, papers: { $nin: [ paperName ] } },
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

                console.log("clear");

                papers.updateOne(
                    { 'name': socket.paper },
                    { '$set': { 'paths': [] }}
                );

                socket.to(socket.paper).emit('paper/clear');
            });

            socket.on('users/get_papers', (username, callback) => {
                
                users.findOne({ name: username })
                    .then(user => {
                        callback(user.papers);
                    });
            });

            socket.on('users/signup' , (username, password) => {

                db.createUser(
                   {
                       user: username,
                       pwd: password,
                       roles: []
                    }
                 );
            })

            socket.on('users/login' , (username, password, callback) => {

                var success = db.auth({user: username, pwd: password})
                callback(success);  // notify client if login was successful or not

                if(success) {
                    socket.user = username;
                }
            })
        });

    })
    .catch(err => {
        console.log(err);
    });





module.exports = app;
