const AnonMessageModel = require("../models/AnonMessage");


const AnonMessageController = {
    insertMessage: async (req, res) => {
        const { message, name } = req.body
        const ip = req.ip || req.connection.remoteAddress;
        const user_agent = req.headers["user-agent"];

        if (!message) {
            return res.status(400).json({
                message: "Message not registered, missing message field.",
                code: "MISSING_MESSAGE"
            })
        }

        try {
            const response = await AnonMessageModel.insertMessage(name, message, ip, user_agent)

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
        try {
            const response = await AnonMessageModel.listMessage()
            console.log(response)
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
    }


}

module.exports = AnonMessageController