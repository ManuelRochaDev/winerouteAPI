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

function getCategoryByID(id_category) {
    const sql = "SELECT id_category FROM category WHERE title = ?";
    return con.query(sql, [id_category]).then(res => {
        return res[0].id_category
    });
}

function addRoutes(req, res) {
    let dif = req.sanitize(req.body.dif);
    let title = req.sanitize(req.body.title);
    let city = req.sanitize(req.body.city);
    let id_category = req.sanitize(req.body.category);
    //ainda não é o ID, é só o nome
    let actual_id_category = getCategoryByID(id_category);
    /* let id_category = req.sanitize(req.body.id_category);
    category = req.sanitize(req.body.category); */
    let desc = req.sanitize(req.body.desc);
    let routePois = JSON.stringify(req.body.routePois);
    let time = req.sanitize(req.body.time);
    let distance = req.sanitize(req.body.distance);
    let audiolink = req.sanitize(req.body.audiolink)

    con.query(`INSERT INTO route (difficulty, distance, time, title, city, id_category, id_user, description, routePois, audiolink) VALUES ('${dif}', '${distance}', '${time}', '${title}', '${city}', '${actual_id_category}', '0', '${desc}', '${routePois}', '${audiolink}')`, (qError, result) => {
        if (!qError) {
            console.log("success");
            return res.send("success");
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
    let city = req.sanitize(req.body.city);
    let dif = req.sanitize(req.body.dif);
    let routePois = JSON.stringify(req.body.routePois);
    let desc = req.sanitize(req.body.desc);
    let audiolink = req.sanitize(req.body.audiolink);

    con.query("UPDATE route SET title = ?, city = ?, difficulty = ?, routePois = ?, description = ?, audiolink = ? WHERE id_route = ?", [title, city, dif, routePois, desc, audiolink, id_route], function (qError,
        result) {
        if (!qError) {
            res.send("success");
        } else
            console.log(qError);
    });
}

function deleteRoute(req, res) {
    let id_route = req.sanitize(req.params.id);
    con.query("DELETE from route WHERE id_route = ?", id_route, function (qError,
        result) {
        if (!qError) {
            return res.json("success");
        } else
            console.log(qError);
    });
}

module.exports = {
    getRoutes,
    getRouteByID,
    addRoutes,
    updateRoute,
    deleteRoute,
    getCategoryByID
}