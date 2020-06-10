const con = require("../database/connection");

function getRoutes(req, res) {
    con.query(`SELECT * FROM route`, (qError, result) => {
        if (!qError) {
            return res.send(result);
        } else {
            console.log(qError);
        }
    })
}

function addRoutes(req, res) {
    let dif = req.sanitize(req.body.dif);
    let title = req.sanitize(req.body.title);
    let city = req.sanitize(req.body.city);
    //let category = req.sanitize(req.body.category);
    //Falta ir buscar a categoria corretamente à BD
    let desc = req.sanitize(req.body.desc);


    con.query(`INSERT INTO route (difficulty, distance, time, title, city, id_category, id_user, description) VALUES ('${dif}', '0', '0', '${title}', '${city}', '0', '0', '${desc}')`, (qError, result) => {
        if (!qError) {
            console.log("success");
            return res.send(result);
        } else {
            console.log(qError);
        }
    })
}

function getRouteByID(req, res) {
    let id_route = req.sanitize(req.params.id);

    con.query("SELECT * FROM route WHERE id_route = ?", id_route, function (qError,
        result) {
        if (!qError) {
            return res.json(result[0]);
        } else
            console.log(qError);
    });
}

function updateRoute(req, res) {
    let id_route = req.sanitize(req.params.id);
    let title = req.sanitize(req.body.title);

    con.query("UPDATE route SET title = ? WHERE id_route = ?", [title, id_route], function (qError,
        result) {
        if (!qError) {
            res.send(result);
        } else
            console.log(qError);
    });
}

function deleteRoute(req, res) {
    let id_route = req.sanitize(req.params.id);
    con.query("DELETE from route WHERE id_route = ?", id_route, function (qError,
        result) {
        if (!qError) {
            return res.json(result);
        } else
        console.log(qError);
    });
}

module.exports = {
    getRoutes,
    getRouteByID,
    addRoutes,
    updateRoute,
    deleteRoute
}