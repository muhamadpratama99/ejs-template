const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1/todoListDB", {useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to todolist app!"
});

const item2 = new Item({
    name: "Hit + button to add list"
});

const item3 = new Item({
    name: "<= Click here to delete list"
});

const defaultItems = [item1, item2, item3];



app.get('/', function(req, res) {

    Item.find({}, function(err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err){
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved default items to database");
                }
            });
            res.redirect('/');
        } else {
            res.render("list", {listTitle : "Today", newListItems: foundItems});
        }
        
    });
   
});

app.post('/', function(req, res) {
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    });
    item.save();
    console.log("Successfully added new item to dbs");
    res.redirect('/')
});

app.post('/delete', function(req,res) {
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully deleted one list by id");
            res.redirect('/');
        }
    });
    console.log(req.body);
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});