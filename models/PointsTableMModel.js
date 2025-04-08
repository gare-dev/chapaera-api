const pool = require("../config/db");

const PointsTableMModel = {

    insertWin: async (sala, temporada) => {
        const values = [sala, temporada]

        try {
            const query = "UPDATE points_table_m SET vitorias = vitorias + 1, jogos = jogos + 1, pontos = pontos + 3 WHERE sala = $1 AND temporada = $2;"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

    insertDefeat: async (sala, temporada) => {
        const values = [sala, temporada]

        try {
            const query = "UPDATE points_table_m SET derrotas = derrotas + 1, jogos = jogos + 1 WHERE sala = $1 AND temporada = $2;"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

    insertDraw: async (sala, temporada) => {
        const values = [sala, temporada]

        try {
            const query = "UPDATE points_table_m SET empates = empates + 1, pontos = pontos + 1, jogos = jogos + 1 WHERE sala = $1 AND temporada = $2;"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

    listTable: async (temporada) => {
        const values = [temporada]

        try {
            const query = "SELECT * FROM points_table_m WHERE temporada = $1 ORDER BY pontos DESC, vitorias DESC, empates DESC, derrotas ASC;"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    }
}


module.exports = PointsTableMModel;