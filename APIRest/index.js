'use strict'

//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 3001, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
/*var dbConfig = {
    user:  'sa',
    password: '14122009',
    server: 'localhost\\DEVELOPER',
    database: 'dbGestionDePrestamos'
};*/

var dbConfig = {
    user:  'kaysinho',
    password: '14122009',
    server: 'localhost\\SQLSERVER',
    database: 'dbGestionDePrestamos'
};
 
//Function to connect to database and execute query
var  executeQuery = function(res, query){             
     sql.connect(dbConfig, function (err) {
         if (err) {   
                     console.log("Error while connecting database :- " + err);
                     res.send(err);
                  }
                  else {
                         // create Request object
                         var request = new sql.Request();
                         // query to the database
                         request.query(query, function (err, recordset) {
                           if (err) {
                                      console.log("Error while querying database :- " + err);
                                      res.send(err);
                                     }
                                     else {
                                       res.send(recordset);
                                            }
                               });
                       }
      });           
}

//GET API
app.get("/api/v1/clients", function(req , res){
                var query = "SELECT * FROM [Clientes]";
                executeQuery (res, query);
});

//POST API
 app.post("/api/v1/clients", function(req , res){
                console.log(req.body);
                var query = `INSERT INTO [Clientes] 
                            (Documento, Nombre, Apellidos, FechaNacimiento, FechaRegistro)
                             VALUES 
                             ('${req.body.Document}', '${req.body.Name}', '${req.body.LastName}', '${req.body.BirthDate}', '${req.body.BirthDate}')`;
                executeQuery (res, query);
});

/*
//PUT API
 app.put("/api/user/:id", function(req , res){
                var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
                executeQuery (res, query);
});

// DELETE API
 app.delete("/api/user /:id", function(req , res){
                var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
                executeQuery (res, query);
});*/