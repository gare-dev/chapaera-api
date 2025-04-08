const pool = require("../config/db")


const ResultsTableModel = {

    insertResults: async (sala, gols_sala, adv, gols_adv, temporada, data_jogo, registered_by, who_won) => {

        const values = [sala, gols_sala, adv, gols_adv, temporada, data_jogo, registered_by, who_won]

        try {

            const query = "INSERT INTO results_table (sala, gols_sala, adv, gols_adv, temporada, data_jogo, registered_by, who_won) VALues ($1, $2, $3, $4, $5, $6, $7, $8)"
            const response = await pool.query(query, values)
            return response
        } catch (err) {
            throw err
        }
    }
}


module.exports = ResultsTableModel