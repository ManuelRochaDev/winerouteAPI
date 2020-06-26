const con = require("../database/connection");
const multer = require("multer");

function getPois(req, res) {
    con.query(`SELECT * FROM pointofinterest`, (qError, result) => {
        if (!qError) {
            return res.send(result);
        } else {
            console.log(qError);
        }
    })
}

function addPois(req, res) {
    //just making sure there is no extra second changing the file name
    let currentDate = Date.now();
    let lat = req.sanitize(req.body.lat);
    let long = req.sanitize(req.body.long);
    let name = req.sanitize(req.body.name);
    let poi_img = req.sanitize(req.body.poi_img);

    let audiolink = req.sanitize(currentDate);
    let result = ""
    con.query(`INSERT INTO pointofinterest (lat, longitude, name, audiolink, poi_img) VALUES ('${lat}', '${long}', '${name}', '${audiolink}', '${poi_img}')`, (qError, result) => {
        if (!qError) {
            result = "success"
            console.log("success");
            return res.send(result);
        } else {
            console.log(qError);
        }
    })
}

function getPoiByID(req, res) {
    let id_poi = req.sanitize(req.params.id);

    con.query("SELECT * FROM pointofinterest WHERE id_pointofinterest = ?", id_poi, function (qError,
        result) {
        if (!qError) {
            return res.json(result[0]);
        } else
            console.log(qError);
    });
}

function deletePoi(req, res) {
    let id_poi = req.sanitize(req.params.id);
    con.query("DELETE from pointofinterest WHERE id_pointofinterest = ?", id_poi, function (qError,
        result) {
        if (!qError) {
            return res.json("success");
        } else
            console.log(qError);
    });
}

module.exports = {
    getPois,
    getPoiByID,
    addPois,
    deletePoi,
}
