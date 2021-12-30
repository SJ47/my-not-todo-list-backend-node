const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors())

const username = process.env.REACT_APP_DB_USER;
const password = process.env.REACT_APP_DB_KEY;

const uri = `mongodb+srv://${username}:${password}@cluster0.ugqf0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        const db = client.db("tasks_hub");
        const tasksCollection = db.collection("tasks");
        const tasksRouter = createRouter(tasksCollection);
        app.use("/", tasksRouter);
    })
    .catch(console.error);

app.listen(process.env.PORT || 5001, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
