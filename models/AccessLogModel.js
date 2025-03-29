const pool = require("../config/db")


const AccessLogModel = {
    insertLog: async (login_used, pwd_used, success) => {
        const values = [login_used, pwd_used, success]

        try {
            const query = "INSERT INTO access_log (login_used, pwd_used, success) VALUES ($1, $2, $3)"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    }
}

module.exports = AccessLogModel