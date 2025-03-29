const db = require("../config/db")

const AnonMessageModel = {
    insertMessage: async (name, message, ip, user_agent) => {
        const values = [message, name, ip, user_agent, false]
        try {
            const query =
                "INSERT INTO anon_messages (message, name, ip, user_agent, visualized) VALUES ($1, $2, $3, $4, $5) RETURNING *"
            const response = await db.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

    listMessage: async (showVisualized, filter) => {
        const values = [showVisualized, filter]
        try {
            const query = "SELECT * FROM anon_messages WHERE visualized = $1 OR (message = $2 OR name = $2)"
            const response = await db.query(query, values)

            return response
        } catch (err) {
            throw err
        }
    },

    markAsVisualized: async (operation, messageId) => {
        const values = [operation, messageId]
        try {
            const query = "UPDATE anon_messages SET visualized = $1 WHERE id_message = $2"
            const response = await db.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    }
}

module.exports = AnonMessageModel