const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();

let items = ["Workout", "Breakfast", "Course"];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

    let today = new Date();
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let day = (today.toLocaleDateString("en-US", options));
    res.render('list', { listTitle: day, newlistItems: items });

});

app.post("/", function (req, res) {

    let item = req.body.newItem;

    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
});

app.get("/work", function (req, res) {
    res.render('list', { listTitle: "Work List", newlistItems: workItems });
})

app.post("/work", function (res, req) {
    let item = req.body.newItem;
    res.redirect('/work');
})

app.get("/about", function (req, res) {
    res.render('about');
})

app.listen(PORT, function () {
    console.log(`Server is running on port${PORT}}`);
});



// Sunday - Saturday : 0 - 6