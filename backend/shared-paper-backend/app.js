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
        var collection;
        
        io.on('connection', socket => {
            
            console.log('User connected');

            // Inital connection
            socket.on('paper/connection', (paperName, callback) => {
                
                collection = db.collection(paperName);
                socket.join(paperName);
                socket.paper = paperName;

                // get all docunents
                collection.find().toArray((err, array) => {
                    
                    if(err) {
                        console.log(err);
                    }

                    callback(array);
                });

            });

            socket.on('paper/add_path', (path) => {
                
                if(collection) {
                    collection.updateOne(
                        { 'path.id': path.id },
                        { path: path },
                        {
                            upsert: true
                        }
                    )
                    .then(res => {
                        return collection.findOne({ 'path.id': path.id })
                    }).then(res => {
                        socket.emit('paper/update', res);   // emit the updated path
                    });
                }

            });

        });

    })
    .then(err => {
        console.log(err);
    });





module.exports = app;
