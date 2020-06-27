const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
//para usar o req.body, body parsing
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');

const app = express();

app.use(cors({
    credentials: true,
    origin: true
}))

app.use(express.json());

var host = process.env.HOST || 'localhost';

const port = process.env.PORT || 8080;

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.urlencoded({
    extended: false
}));







//Queremos JSON
app.use(bodyParser.json());

//rotas têm de vir no fim, senão há erros
const userRouter = require("./routes/users.router");
const routesRouter = require("./routes/routes.router");
const commentsRouter = require("./routes/comments.router");
const poisRouter = require("./routes/pois.router");
const categoriesRouter = require("./routes/categories.router");

app.use(userRouter);
app.use(routesRouter);
app.use(commentsRouter);
app.use(poisRouter);
app.use(categoriesRouter);

app.use(history({
    verbose: true
}));
app.use('/', express.static(path.join(__dirname, 'dist')));

/* var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    //requireHeader: ['origin', 'x-requested-with'],
    //removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
}); */

app.listen(port, () => console.log(`We're live on port ${port}`));