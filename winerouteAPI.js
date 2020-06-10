const express = require('express');
//para usar o req.body, body parsing
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

var host = process.env.HOST || 'localhost';

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//Queremos JSON
app.use(bodyParser.json());

//Penso não ser necessário o cors, foi inserido na altura ao tentar corrigir um erro não relacionado
/* const cors = require('cors');
app.use(cors()) */

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

/* var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    //requireHeader: ['origin', 'x-requested-with'],
    //removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
}); */

app.listen(port, () => console.log(`We're live on port ${port}`));