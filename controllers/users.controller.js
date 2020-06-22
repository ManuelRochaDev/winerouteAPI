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
    return emailExists(email).then(exists => {
        /* console.log(exists) */
        if (exists === false) {
            console.log(exists)
            con.query(`INSERT INTO user (name, lastname, email, password, usertype, avatar, isblocked) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '1', '', '0')`, (qError, result) => {
                if (!qError) {
                    let result = "success"
                    console.log("success");
                    return res.send(result);
                } else {
                    console.log(qError);
                }
            })
        } else {
            console.log("email already exists");
            result = "email already exists"
            return res.send(result);
        }
    })
}

function emailExists(email) {
    const sql = "SELECT * FROM user WHERE email = ?";
    return con.query(sql, [email]).then(res => {
        return res.length > 0 || res.length === undefined;
    });
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

function blockUser(req, res) {
    let id_user = req.sanitize(req.params.id);
    return isBlocked(id_user).then(isBlock => {
        if (isBlock === 1) {
            console.log(isBlock)
            con.query("UPDATE user SET isBlocked = 0 WHERE id_user = ?", [id_user], function (qError,
                result) {
                if (!qError) {
                    res.send(result);
                } else {
                    console.log(qError);
                }
            });
        } else {
            console.log(isBlock)
            con.query("UPDATE user SET isBlocked = 1 WHERE id_user = ?", [id_user], function (qError,
                result) {
                if (!qError) {
                    res.send(result);
                } else {
                    console.log(qError);
                }
            });
        }
    })
}

function isBlocked(id_user) {
    const sql = "SELECT isBlocked FROM user WHERE id_user = ?";
    return con.query(sql, [id_user]).then(res => {
        /* console.log(res.id_user) */
        if (res[0].isBlocked == 1) {
            console.log("isBlocked: " + res[0].isBlocked)
            return 1
        }
        if (res[0].isBlocked == 0) {
            console.log("isBlocked: " + res[0].isBlocked)
            return 0
        }
    });
}

function isAdmin(id_user) {
    const sql = "SELECT userType FROM user WHERE id_user = ?";
    return con.query(sql, [id_user]).then(res => {
        /* console.log(res.id_user) */
        if (res[0].userType == 1) {
            console.log("isAdmin: " + res[0].userType)
            return 1
        }
        if (res[0].userType == 0) {
            console.log("isAdmin: " + res[0].userType)
            return 0
        }
    });
}

function upgradeUser(req, res) {
    let id_user = req.sanitize(req.params.id);
    return isAdmin(id_user).then(isOp => {
        console.log(isOp)
        if (isOp === 1) {

            con.query("UPDATE user SET userType = 0 WHERE id_user = ?", [id_user], function (qError,
                result) {
                if (!qError) {
                    res.send(result);
                } else {
                    console.log(qError);
                }
            });
        } else {
            console.log(isOp)
            con.query("UPDATE user SET userType = 1 WHERE id_user = ?", [id_user], function (qError,
                result) {
                if (!qError) {
                    res.send(result);
                } else {
                    console.log(qError);
                }
            });
        }
    })
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
    console.log(email)

    const query = "SELECT * from user where user.email = ?"
    con.query(query, [email], function (qError,
        result) {
        if (!qError) {
            //9170249@esmad.ipp.pt
            /* let message = "success" */
            /* if (result.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
            } else {
                res.send('Incorrect email and/or Password!');
            }
            res.end(); */
            /* if (result.length == 0) {
                //o resultado da query é vazio
                message = "user doesn't exist"
            } else { */
            if (!bcrypt.compareSync(password, result[0].password)) {
                //target[0] porque é um array com um único registo
                message = "wrong password"
            } else if (result[0].isblocked == 1) {
                message = "user blocked"
            } else {
                //se nenhuma das condições for verdade, o login é feito
                message = "login successful"
            }
            /* } */
            /* res.send(message) */

        } else {
            console.log(qError);
        }
        return res.send(message);
    });
    /* } else {
        res.send('error');
        res.end();
    } */
}


module.exports = {
    getUsers,
    getUserByID,
    addUsers,
    updateUser,
    deleteUser,
    loginUser,
    blockUser,
    upgradeUser
}