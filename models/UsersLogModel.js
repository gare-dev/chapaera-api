const pool = require("../config/db")


const UsersLogModel = {
    insertLog: async (login, login_created, pwd_created, desc_created, success) => {

        const values = [login, login_created, pwd_created, desc_created, success]

        try {
            const query = "INSERT INTO users_log (login, login_created, pwd_created, desc_created, success) VALUES ($1, $2, $3, $4, $5)"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }

    }
}

module.exports = UsersLogModel