const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router");
const cors = require("cors");
require("dotenv").config();
const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(express.json()); //Used to parse JSON bodies instead of line above
app.use(cors("Access-Control-Allow-Origin", "*"));

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

app.listen(process.env.PORT || 5000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
// comment to redploy