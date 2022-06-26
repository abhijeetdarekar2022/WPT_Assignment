let dbparams = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'pleasework',
    port: 3306
};
const mysql = require('mysql2');
const con = mysql.createConnection(dbparams);

const express = require('express');
const app = express();

app.use(express.static("sf2"));


//====================================
app.get("/getItem", (req, res) => {
    let input = req.query.itemno;
    let output = {
        status: false,
        itemdetails: { itemno: input, itemname: '', itemprice: 0 }
    };

    con.query('select * from items where itemno =?', [input], (error, rows) => {
        if (rows.length > 0) {
            output.status = true;
            output.itemdetails = rows[0];
        }
        res.send(output);

    });


});
//=================================
app.get("/addItem", (req, res) => {
    let input = {
        itemno: req.query.itemno,
        itemname: req.query.itemname,
        itemprice: req.query.itemprice
    };
    let output = false;



    con.query('insert into items(itemno,itemname,itemprice) values (?,?,?)',
        [input.itemno, input.itemname, input.itemprice],
        (error, whathappenedtoinsert) => {
            if (error) {

            }
            else if (whathappenedtoinsert.affectedRows > 0) {
                output = true;

            }
            res.send(output);

        });

});

//=================================

app.get("/updateItem", (req, res) => {

    let output = false;
    let input = {
        itemno: req.query.itemno,
        itemname: req.query.itemname,
        itemprice: req.query.itemprice
    };

    con.query('update items set itemname = ?,itemprice =? where itemno=?',
        [input.itemname, input.itemprice, input.itemno],
        (error, whathappenedtoinsert) => {
            if (error) {
                //when you dont have data why problem is there collect data first.

            }
            else if (whathappenedtoinsert.affectedRows > 0)
                output = true;

            res.send(output);
        }
    );

});
//=================================
app.get("/getAllItems", (req, res) => {

    con.query('select * from items', [], (error, rows) => {
        res.send(rows);
    }
    );
});

//=================================

app.listen(909, function () { });
