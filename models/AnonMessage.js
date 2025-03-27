const db = require("../config/db")

const AnonMessageModel = {
    insertMessage: async (name, message, ip, user_agent) => {
        const values = [message, name, ip, user_agent]
        try {
            const query =
                "INSERT INTO anon_messages (message, name, ip, user_agent) VALUES ($1, $2, $3, $4) RETURNING *"
            const response = await db.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

    listMessage: async () => {
        try {
            const query = "SELECT * FROM anon_messages"
            const response = await db.query(query)

            return response
        } catch (err) {
            throw err
        }
    }
}

module.exports = AnonMessageModel