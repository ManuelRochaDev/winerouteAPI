const con = require("../database/connection");


function getCategories(req, res) {
    con.query(`SELECT * FROM category`, (qError, result) => {
        if (!qError) {
            return res.send(result);
        } else {
            console.log(qError);
        }
    })
}

function addCategories(req, res) {
    let name = req.sanitize(req.body.name);
    console.log(name)
    con.query(`INSERT INTO category (name) VALUES ('${name}')`, (qError, result) => {

        if (!qError) {
            console.log("success");
            return res.send(result);
        } else {
            console.log(qError);
        }
    })
}

function getCategoryByID(req, res) {
    let id_category = req.sanitize(req.params.id);

    con.query("SELECT * FROM category WHERE id_category = ?", id_category, function (qError,
        result) {
        if (!qError) {
            return res.json(result[0]);
        } else
        console.log(qError);
    });
}

function deleteCategory(req, res) {
    let id_category = req.params.id;
    //console.log("id: " + req.params.id)
    con.query("DELETE from category WHERE id_category = ?", id_category, function (qError,
        result) {
        if (!qError) {
            return res.json(result);
        } else
        console.log(qError);
    });
}

module.exports = {
    getCategories,
    getCategoryByID,
    addCategories,
    deleteCategory
}