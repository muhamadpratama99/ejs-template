const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();


let items = ["Welcome to my todo-list app!", "Type here to add list", "<= Click here to delete your list"];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function(req, res) {
    let today = new Date();
    let options = {weekday: "long", day: "numeric", month:"long"};
    let day = today.toLocaleDateString("en-us", options);
    res.render("list", {listTitle : day, newListItem : items});
});

app.post('/', function(req, res) {
    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', function(req, res) {
    res.render("list", {listTitle : "Work List", newListItem: workItems});
});

app.listen(PORT, function(){
    console.log("Server is running on port 3000");
});