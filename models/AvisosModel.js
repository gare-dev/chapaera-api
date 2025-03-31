const pool = require("../config/db")

const AvisosModel = {

    insertAviso: async (title, message, created_by, data) => {
        const values = [title, message, created_by, true, data]

        try {
            const query = "INSERT INTO avisos_table (title, message, created_by, ativado, data) VALUES ($1, $2, $3, $4, $5)"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

    listAviso: async () => {

        try {
            const query = "SELECT * FROM avisos_table"
            const response = await pool.query(query)
            return response
        } catch (err) {
            throw err
        }
    },

    deleteAviso: async (id_aviso) => {
        const values = [id_aviso]

        try {
            const query = "DELETE FROM avisos_table WHERE id_aviso = $1"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

    editAviso: async (id_aviso, title, message) => {
        const values = [id_aviso, title, message]

        try {
            const query = "UPDATE avisos_table SET title = $2, message = $3 WHERE id_aviso = $1"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },


}

module.exports = AvisosModel