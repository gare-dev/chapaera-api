const pool = require("../config/db")


const UsersModel = {
    UsersLogin: async (login, password) => {
        const values = [login, password]

        try {
            const query = "SELECT * FROM users_table WHERE login = $1 AND password = $2"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

    createUser: async (login, password, description) => {
        const values = [login, password, description]

        try {
            const query = "INSERT INTO users_table (login, password, description) VALUES ($1, $2, $3) RETURNING *"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

}

module.exports = UsersModel
