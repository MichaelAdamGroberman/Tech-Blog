const express = require("express");
const exphbs = require("express-handlebars");
const path = require('path')
const app = express();
const port = process.env.PORT || 5000;
const routes = require('./src/controllers/index');

app.use(routes);

const db = require("./config/database")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.engine('hbs', exphbs({ extname: ".hbs" }));

app.set('view engine', 'hbs');


db.sync({ force: false }).then((data) => { console.log("db synced successfully"); }).catch((err) => { console.log("error syncing user model", err) });



app.listen(port, () => console.log(`listening on port ${port}`));
