var express = require('express');
var app     = express();
const db = require("./db-connector");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
PORT = 51336;


app.post("/create", (req, res) => {
    let data = req.body;

    query1 = `SELECT * FROM Users WHERE username = '${data['username']}'`;

    db.pool.query(query1, function(error, rows, fields) {
        if (rows.length > 0) {
            res.status(400).send({
                message: "Username already exits"
            });
        } else {

            query2 = `INSERT INTO Users (username, password) VALUES ('${data['username']}', '${data['password']}')`;

            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.status(400);
                } else {
                    res.status(201).send({
                        message: "User Created!"
                    });
                }
            })
        }
    })
});

app.get("/login", (req, res) => {
    let data = req.body;

    query = `SELECT * FROM Users WHERE username = '${data['username']}' AND password = '${data['password']}'`;
    db.pool.query(query, function(error, rows, fields) {
        if (rows.length == 0) {
            res.status(401).send({
                message: "Invalid Credentials"
            });

        } else {
            res.status(200).send({
                message: "Login successful",
            });
        }
    })
});

app.delete("/delete", (req, res) => {
    let data = req.body;

    query1 = `SELECT * FROM Users WHERE username = '${data['username']}' AND password = '${data['password']}'`;

    db.pool.query(query1, function(error, rows, fields) {
        if (rows.length == 0) {
            res.status(401).send({
                message: "Invalid Credentials"
            });

        } else {
            query2 = `DELETE FROM Users WHERE username = '${data['username']}' AND password = '${data['password']}'`;
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    res.status(500);
                } else {
                    res.status(200).send({
                        message: "Acccount deleted"
                    });
                }  
            })
        }
    })
})


app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

