const pool = require("../config/db")


const CheckPermissionModel = {
    checkPermission: async (login) => {
        const values = [login]

        try {
            const query = "SELECT * FROM users_table WHERE login = $1 AND status = 'A'"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    }
}

module.exports = CheckPermissionModel