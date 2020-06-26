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
            return res.json(result);
        } else
            console.log(qError);
    });
}

module.exports = {
    getComments,
    getCommentByID,
    addComments,
    deleteComment
}