const { createPool } = require('mysql2')

const pool = createPool({
    host: "192.168.1.112",
    user: "pocketmouse",
    password: "bbelt111",
    database: "burrow",
    connectionLimit: 10
})

function getRecord() {
    return "data";
}

/*
pool.query('select * from tasks', (err, result, fields) => {
    if (err) {
        return console.log(err)
    }
    return console.log(result);
});
*/

module.exports.getRecord = getRecord;
module.exports = pool;