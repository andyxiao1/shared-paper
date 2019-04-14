require('dotenv').config();

var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const MongoClient = require('mongodb').MongoClient;

// Will 404 if you try to access using HTTP
app.get('*', (req, res) => {
    res.sendStatus(404);
});

// Connect to MongoDB database
MongoClient.connect(process.env.PORT || 3000, { useNewUrlParser: true })
    .then(client => {

        const db = client.db();
        const papers = db.collection('papers');
        
        io.on('connection', socket => {
            
            console.log('User connected');

            // Inital connection
            socket.on('paper/connection', (paperName, callback) => {
                
                socket.join(paperName);
                socket.paper = paperName;

                // get all paths
                papers.findOne({ name: socket.paper })
                    .then(paper => {
                        callback(paper.paths);
                    });

            });

            socket.on('paper/add_path', (pathObj) => {
                
                papers.updateOne(
                    { 
                        'name': socket.paper,
                        'paths.path.id': pathObj.path.id
                    },
                    { $set: { 'pathObj.path': pathObj.path }},
                    { upsert: true }    // insert if not exists
                ).then(res => {
                    return papers.findOne({ 
                        'name': socket.paper,
                        'paths.path.id': pathObj.path.id 
                    })
                }).then(res => {
                    socket.emit('paper/update', res);   // emit the updated path
                });
            });

            socket.on('paper/clear', () => {
                io.to(socket.paper).emit('paper/clear');
            });

        });

    })
    .then(err => {
        console.log(err);
    });





module.exports = app;
