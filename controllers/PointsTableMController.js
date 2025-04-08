const PointsTableMModel = require("../models/PointsTableMModel")

const PointsTableMController = {
    listTableM: async (req, res) => {
        const { temporada } = req.body

        try {

            const response = await PointsTableMModel.listTable(temporada)

            if (response.rowCount >= 1) {
                return res.status(200).json({
                    message: "List successfull",
                    code: "RETURN_SUCCESSFULL",
                    data: response.rows
                })
            }

            return res.status(404).json({
                message: "No data found",
                code: "NO_DATA"
            })

        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to list results",
                error_message: error.toString(),
                code: "LISTRESULTS_ERROR"
            })
        }
    }
}

module.exports = PointsTableMController