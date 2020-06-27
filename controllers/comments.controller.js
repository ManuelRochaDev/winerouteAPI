const con = require("../database/connection");


function getComments(req, res) {
    con.query(`SELECT * FROM comment`, (qError, result) => {
        if (!qError) {
            return res.send(result);
        } else {
            console.log(qError);
        }
    })
}

function addComments(req, res) {
    let text = req.sanitize(req.body.text);
    let rating = req.sanitize(req.body.rating);
    let id_route = req.sanitize(req.body.id_route);
    let id_user = req.sanitize(req.body.id_user);
    let commentDate = req.sanitize(req.body.commentDate);

    con.query(`INSERT INTO comment (text, rating, id_route, id_user, commentDate) VALUES ('${text}', '${rating}', '${id_route}' ,'${id_user}', '${commentDate}')`, (qError, result) => {
        if (!qError) {
            console.log("success");
            return res.send("success");
        } else {
            console.log(qError);
        }
    })
}

function getRatings(req, res) {
    con.query(`SELECT * FROM rating`, (qError, result) => {
        if (!qError) {
            return res.send(result);
        } else {
            console.log(qError);
        }
    })
}

function addRating(req, res) {
    let id_user = req.sanitize(req.body.id_user);
    let rating_value = req.sanitize(req.body.rating_value);


    con.query(`INSERT INTO rating (rating_value, id_user) VALUES ('${rating_value}', '${id_user}')`, [rating_value, id_user], function (qError,
        result) {
        if (!qError) {
            return res.send("rating updated");
        } else
            console.log(qError);
    });
}

function updateRating(req, res) {
    let id_rating = req.sanitize(req.params.id);
    let id_user = req.sanitize(req.body.id_user);
    let rating_value = req.sanitize(req.body.rating_value);


    con.query("UPDATE rating SET rating_value = ? WHERE id_user = ?", [rating_value, id_user], function (qError,
        result) {
        if (!qError) {
            return res.send("rating updated");
        } else
            console.log(qError);
    });
}

/* function checkRating(req, res) {
    let id_user = req.sanitize(req.body.id_user);
    let result = ""

    con.query("SELECT * FROM rating WHERE id_user = ?", id_user, function (qError,
        result) {
        if (!qError) {
            result = res.json(result[0].rating_value);
            updateRating()
        } else
            result = "no rating yet";
            addRating()
    });
    return (result)
} */

function getCommentByID(req, res) {
    let id_comment = req.sanitize(req.params.id);

    con.query("SELECT * FROM comment WHERE id_comment = ?", id_comment, function (qError,
        result) {
        if (!qError) {
            return res.json(result[0]);
        } else
            console.log(qError);
    });
}

function deleteComment(req, res) {
    let id_comment = req.params.id;
    con.query("DELETE from comment WHERE id_comment = ?", id_comment, function (qError,
        result) {
        if (!qError) {
            return res.json("comment deleted");
        } else
            console.log(qError);
    });
}

module.exports = {
    getComments,
    getCommentByID,
    addComments,
    deleteComment,
    addRating,
    updateRating,
    getRatings
}