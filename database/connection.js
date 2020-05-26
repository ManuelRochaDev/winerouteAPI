const mysql = require('mysql');
const util = require("util");

let connection;

let config = {
    host: "remotemysql.com",
    port: "3306",
    user: "RnmQTIGoxJ",
    password: "2J5w370Aau",
    database: "RnmQTIGoxJ"
};

function handleDisconnect() {
    connection = mysql.createConnection(config);

    connection.connect(function (err) {
        if (err) {
            console.log('error connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
            //caso a conexão falhe, tentar outra vez com um delay de 2 segundos, para evitar erros piores
        }
    });

    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });

    connection.query=util.promisify(connection.query);
}

handleDisconnect();

module.exports = connection;