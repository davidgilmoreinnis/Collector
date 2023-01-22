const express = require('express');
const app = express();
const port = 8000;

//get all records
app.get('/', function (req, res) {
    res.send('All Records');
})

//get specfici record
app.get('/:id', function(req, res) {
    res.send('Specific record');
})

//add one record
app.post('/', function(req, res) {
    res.send('Add Record');
})

//add multiple records
app.post('/add-multiple', function(req, res) {
    res.send('Add Multiple Records');
})

//delete one record
app.delete('/:id', function(req, res) {
    res.send('Delete Record');
})

app.listen(port, () => {
    console.log("Now Listening on Port 8000");
});
