const express = require("express");
const ObjectID = require("mongodb").ObjectID;

const createRouter = function (collection) {

    const router = express.Router();

    // Index - get all tasks
    router.get("/read-all", (req, res) => {
        collection
            .find()
            .toArray()
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });

    //CREATE
    router.post("/create", (req, res) => {
        const newData = req.body;
        collection
            .insertOne(newData)
            .then((result) => res.json(result.ops[0]))
            .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
            })
    });

    //DELETE
    router.delete("/delete/:id", (req, res) => {
        const id = req.params.id;
        collection
            .deleteOne({ _id: ObjectID(id) })
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });

    //UPDATE
    router.put("/update/:id", (req, res) => {
        const id = req.params.id;
        const updatedData = req.body;
        delete updatedData._id;

        collection
            .updateOne({ _id: ObjectID(id) }, { $set: updatedData })
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                console.err(err);
                res.status(500);
                res.json({ status: 500, error: err });
            });
    });

    return router;
}

module.exports = createRouter;
