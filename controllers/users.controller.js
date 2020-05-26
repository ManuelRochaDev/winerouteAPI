const bcrypt = require('bcrypt');
const con = require("../database/connection");
let SALT_ROUNDS = 10;


function getUsers(req, res) {
    con.query(`SELECT * FROM user`, (qError, result) => {
        if (!qError) {
            return res.send(result);
        } else {
            console.log(qError);
        }
    })
}

function addUsers(req, res) {
    let firstName = req.sanitize(req.body.firstName);
    let lastName = req.sanitize(req.body.lastName);
    let email = req.sanitize(req.body.email);
    let password = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

    con.query(`INSERT INTO user (firstname, lastname, email, password, usertype, avatar, isblocked) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '0', '', '0')`, (qError, result) => {
        if (!qError) {
            console.log("success");
            return res.send(result);
        } else {
            console.log(qError);
        }
    })

}

function getUserByID(req, res) {
    let id_user = req.sanitize(req.params.id);

    con.query("SELECT * FROM user WHERE id_user = ?", id_user, function (qError,
        result) {
        if (!qError) {
            return res.json(result[0]);
        } else {
            console.log(qError);
        }
    });
}

function updateUser(req, res) {
    let id_user = req.sanitize(req.params.id);
    let email = req.sanitize(req.body.email);

    con.query("UPDATE user SET email = ? WHERE id_user = ?", [email, id_user], function (qError,
        result) {
        if (!qError) {
            res.send(result);
        } else {
            console.log(qError);
        }
    });
}

function deleteUser(req, res) {
    let id_user = req.sanitize(req.params.id);
    con.query("DELETE from user WHERE id_user = ?", id_user, function (qError,
        result) {
        if (!qError) {
            return res.json(result);
        } else
        console.log(qError);
    });
}

function loginUser(req, res) {
    let email = req.sanitize(req.body.email)
    let password = req.sanitize(req.body.password)

    const query = "SELECT * from user where user.email = ?"
    con.query(query, [email], function (qError,
        target) {
        if (!qError) {
            let message = "success"

            if (target.length == 0) {
                message = "user doesn't exist"
            } else {
                if (!bcrypt.compareSync(password, target[0].password)) {
                    message = "wrong password"
                } else if (target[0].isblocked == 1) {
                    message = "user blocked"
                } else {
                    message = "login successful"
                }
            }
            res.send(message)
        } else {
            console.log(qError);
        }
    });
}

module.exports = {
    getUsers,
    getUserByID,
    addUsers,
    updateUser,
    deleteUser,
    loginUser
}