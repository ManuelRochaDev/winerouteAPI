const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


const cors = require('cors');
app.use(cors())

//Routes
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

app.listen(port, () => console.log(`Listening on port ${port}`));