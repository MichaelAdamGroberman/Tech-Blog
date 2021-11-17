const express = require('express')
const port = process.env.PORT || 5000;
const app = express();
const routes = require('./controllers/index');
const path = require('path')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


const { sequelize } = require('./models');
app.listen({ port: port }, async () => {
    console.log(`listening on port ${port}`)
    await sequelize.sync({ alter: true });
    console.log('DB synced')
})

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
