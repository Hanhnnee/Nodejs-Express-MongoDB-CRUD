const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const path = require('path');
const port = 3000;
const morgan = require('morgan');
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

//Connect DB
db.connect();

// HTTP request logger middleware for node.js
// app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`app listening at: http://localhost:${port}`);
});
