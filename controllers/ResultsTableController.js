const jwt = require("jsonwebtoken");
const ResultsTableModel = require("../models/ResultsTableModel");
const PointsTableMModel = require("../models/PointsTableMModel");


const ResultsTableController = {

    insertResults: async (req, res) => {
        const { sala, gols_sala, adv, gols_adv, temporada, data_jogo } = req.body
        const jwtToken = jwt.decode(req.headers["authorization"]);
        let who_won = ''

        if (gols_sala > gols_adv) {
            PointsTableMModel.insertWin(sala, temporada)
            PointsTableMModel.insertDefeat(adv, temporada)
            who_won = sala
        } else if (gols_sala < gols_adv) {
            PointsTableMModel.insertWin(sala, temporada)
            PointsTableMModel.insertDefeat(adv, temporada)
            who_won = adv
        } else {
            PointsTableMModel.insertDraw(sala, temporada)
            PointsTableMModel.insertDraw(adv, temporada)
            who_won = 'EMPATE'
        }

        try {
            const response = await ResultsTableModel.insertResults(sala, gols_sala, adv, gols_adv, temporada, data_jogo, jwtToken.login, who_won)

            if (response.rowCount >= 1) {
                return res.status(200).json({
                    message: "Result inserted successfully!",
                    code: "RESULT_INSERT"
                })
            }

        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to insert result",
                error_message: error.toString(),
                code: "INSERTRESULT_ERROR"
            })
        }

    }
}

module.exports = ResultsTableController