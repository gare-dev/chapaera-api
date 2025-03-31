const pool = require("../config/db")


const MatchesModel = {
    insertMatch: async (created_by, rm, ano, curso, curso_adversario, data_jogo, periodo, aprovado, ano_adversario) => {
        const values = [created_by, rm, ano, curso, curso_adversario, data_jogo, periodo, aprovado, ano_adversario]

        try {
            const query = "INSERT INTO matches (created_by, rm, ano, curso, curso_adversario, data_jogo, periodo, aprovado, ano_adversario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

    consultMatchDatePeriod: async (data_jogo, periodo) => {
        const values = [data_jogo, periodo]
        try {
            const query = "SELECT * FROM matches WHERE DATE(data_jogo) = $1 AND periodo = $2"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

    consultMatchDate: async (data_jogo) => {
        const values = [data_jogo]

        try {
            const query = "SELECT * FROM matches WHERE DATE(data_jogo) = $1"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

    aproveMatch: async (id_match) => {
        const values = [id_match]

        try {
            const query = "UPDATE matches SET aprovado = true WHERE id_match = $1"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    },

    getMatches: async () => {
        try {
            const query = "SELECT * FROM matches"
            const response = await pool.query(query)
            return response
        } catch (err) {
            throw err
        }
    },

    getAprovedMatches: async (aprovados) => {
        const values = [aprovados]

        try {
            const query = "SELECT * FROM matches WHERE aprovado = $1"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err

        }
    }
}

module.exports = MatchesModel