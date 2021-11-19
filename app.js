const express = require('express')
const port = process.env.PORT || 5000;
const app = express();
const routes = require('./controllers/index');
const path = require('path')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const { engine } = require('express-handlebars');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('./models');
const sessionconfig = {
    secret: "config.session.secret",
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
        expiration: 6 * 60 * 60 * 1000
    })
}
// session setting
app.use(session(sessionconfig))
app.use(routes);
app.engine('handlebars', engine({
    defaultLayout: "main",
    helpers: {

        prettifyDate: function (timestamp) {
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }

            var curr_date = timestamp.getDate();
            var curr_month = timestamp.getMonth();
            curr_month++;
            var curr_year = timestamp.getFullYear();


            result = addZero(curr_date) + "/" + addZero(curr_month) + "/" + addZero(curr_year)
            return result;
        },
        ifEquals: function (arg1, arg2) {
            return (arg1 == arg2)
        },
        ifNotEquals: function (arg1, arg2) {
            return !(arg1 == arg2)
        }
    }
}));
app.set('view engine', 'handlebars');
app.set("views", "./views");


app.listen({ port: port }, async () => {
    console.log(`listening on port ${port}`)
    await sequelize.sync({ alter: true });
    console.log('DB synced')
})
