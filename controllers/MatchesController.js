const MatchesModel = require("../models/MatchesModel")


const MatchesController = {
    insertMatch: async (req, res) => {
        const { created_by, rm, ano, curso, curso_adversario, data_jogo, periodo, ano_adversario } = req.body

        if (!created_by || !rm || !ano || !curso || !curso_adversario || !data_jogo || !periodo || !ano_adversario) {
            return res.status(404).json({
                message: "Missing info!",
                code: "MISSING_INFO"
            })
        }
        try {

            const result = await MatchesModel.consultMatchDatePeriod(data_jogo, periodo)

            if (result.rowCount >= 1) {
                return res.status(404).json({
                    message: "There is a match schuled in this date and period!",
                    code: "BUSY_DATE_PERIOD"
                })
            }

            const response = await MatchesModel.insertMatch(created_by, rm, ano, curso, curso_adversario, data_jogo, periodo, false, ano_adversario)
            if (response.rowCount === 1) {
                return res.status(201).json({
                    message: "Match created successfully!",
                    code: "MATCH_CREATED"
                })
            }
        } catch (error) {
            console.log(error)
        }
    },

    consultMatchDate: async (req, res) => {
        const { data_jogo } = req.body

        if (!data_jogo) {
            return res.status(404).json({
                message: "Missing info.",
                code: "MISSING_INFO"
            })
        }

        try {

            const response = await MatchesModel.consultMatchDate(data_jogo)

            if (response.rowCount >= 1) {
                return res.status(200).json({
                    message: response.rows
                })
            }

            return res.status(404).json({
                message: "There is no matches in this date",
                code: "NO_MATCHES_SCHULED"
            })
        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to consult matches",
                error_message: error,
                code: "CONSULT_ERROR"
            })
        }
    },

    aproveMatch: async (req, res) => {
        const { id_match } = req.body

        if (!id_match) {
            return res.status(404).json({
                message: "Missing info",
                code: "MISSING_INFO"
            })
        }

        try {

            const response = await MatchesModel.aproveMatch(id_match)

            if (response.rowCount === 1) {
                return res.status(201).json({
                    message: "Match aproved successfully!",
                    code: "MATCH_APROVED"
                })
            }

            return res.status(404).json({
                message: "It was not possible to aprove the match, maybe it's already aproved?",
                code: "NOT_APROVED"
            })

        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to consult matches",
                error_message: error,
                code: "APROVE_ERROR"
            })
        }
    },

    getMatches: async (req, res) => {

        try {

            const response = await MatchesModel.getMatches()

            if (response.rowCount >= 1) {
                return res.status(200).json({
                    message: "GetMatches successfulll!",
                    data: response.rows,
                    code: "GETMATCHES_SUCCESSFULL"
                })
            }


        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to get matches",
                error_message: error.toString(),
                code: "GETMATCHES_ERROR"
            })
        }
    },

    getAprovedMatches: async (req, res) => {
        const { aprovados } = req.body

        try {
            const response = await MatchesModel.getAprovedMatches(aprovados)

            if (response.rowCount >= 1) {
                return res.status(200).json({
                    code: "GET_DATASUCCESSFULL",
                    data: response.rows
                })
            }

            return res.status(404).json({
                message: "Thers is no matches.",
                code: "NOMATCHES_FOUND"
            })

        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to get matches",
                error_message: error.toString(),
                code: "GETAPROVEDMATCHES_ERROR"
            })
        }
    }
}

module.exports = MatchesController