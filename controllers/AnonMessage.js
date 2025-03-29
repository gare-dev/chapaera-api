const AnonMessageModel = require("../models/AnonMessage");
const requestIp = require("request-ip")

const AnonMessageController = {
    insertMessage: async (req, res) => {
        const { message, name } = req.body
        const user_agent = req.headers["user-agent"];
        const reqIp = requestIp.getClientIp(req)


        if (!message) {
            return res.status(400).json({
                message: "Message not registered, missing message field.",
                code: "MISSING_MESSAGE"
            })
        }
        try {
            const response = await AnonMessageModel.insertMessage(name, message, reqIp, user_agent)

            if (response.rowCount === 1) {
                return res.status(200).json({
                    message: "Message registered successfully.",
                    code: "INSERT_SUCCESSFULL"
                })
            }
        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to insert message.",
                error_message: error,
                code: "INSERT_ERROR"
            })
        }

    },

    listMessage: async (req, res) => {
        const { showVisualized, filter } = req.body
        try {
            const response = await AnonMessageModel.listMessage(showVisualized, filter)

            if (response.rowCount > 0) {
                return res.status(200).json({
                    code: "LIST_SUCCESSFULL",
                    data: response.rows
                })
            }

            return res.status(404).json({
                message: "No data found",
                code: "NO_DATA"
            })
        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to list message.",
                error_message: error,
                code: "LIST_ERROR"
            })
        }
    },

    markAsVisualized: async (req, res) => {
        const { operation, idMessage } = req.body

        if (typeof operation !== "boolean") {
            return res.status(501).json({
                message: "Invalid operation.",
                code: "INVALID_OPERATION"
            })
        }
        try {
            const response = await AnonMessageModel.markAsVisualized(operation, idMessage)

            if (response.rowCount === 1) {
                return res.status(200).json({
                    message: "Message marked as visualized.",
                    code: "VISUALIZED_SUCCESSFULL"
                })
            }

            return res.status(400).json({
                message: "It was not possible to mark this message as visualized.",
                code: "ERROR"
            })


        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to mark as visualized.",
                error_message: error,
                code: "VISUALIZED_ERROR"
            })
        }
    }


}

module.exports = AnonMessageController