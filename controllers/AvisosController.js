const AvisosModel = require("../models/AvisosModel")
const jwt = require("jsonwebtoken");

const AvisosController = {
    insertAviso: async (req, res) => {
        const { title, message } = req.body
        const jwtToken = jwt.decode(req.headers["authorization"]);
        const data = new Date()



        try {
            const response = await AvisosModel.insertAviso(title, message, jwtToken.login, data)

            if (response.rowCount >= 1) {
                return res.status(201).json({
                    message: "Aviso created successfully!",
                    code: "AVISO_CREATED"
                })
            }
        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to create aviso",
                error_message: error.toString(),
                code: "CREATEAVISO_ERROR"
            })
        }
    },

    listAviso: async (req, res) => {

        try {
            const response = await AvisosModel.listAviso()

            if (response.rowCount >= 1) {
                return res.status(200).json({
                    code: "AVISOS_SUCCESSFULL",
                    data: response.rows
                })
            }

            res.status(404).json({
                message: "There is no avisos",
                code: "NOAVISOS_FOUND"
            })
        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to get avisos",
                error_message: error.toString(),
                code: "LISTAVISOS_ERROR"
            })
        }
    },

    deleteAviso: async (req, res) => {
        const { id_aviso } = req.body

        try {

            const response = await AvisosModel.deleteAviso(id_aviso)

            if (response.rowCount === 1) {
                return res.status(200).json({
                    message: "Aviso deleted successfully!",
                    code: "AVISO_DELETED"
                })
            }

            res.status(404).json({
                message: "Aviso not found",
                code: "AVISONOT_FOUND"
            })
        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to delete aviso",
                error_message: error.toString(),
                code: "DELETEAVISO_ERROR"
            })
        }
    },

    editAviso: async (req, res) => {
        const { id_aviso, title, message } = req.body

        try {

            const response = await AvisosModel.editAviso(id_aviso, title, message)

            if (response.rowCount === 1) {
                return res.status(200).json({
                    message: "Aviso edited successfully!",
                    code: "AVISO_EDITED"
                })
            }
        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to edit aviso",
                error_message: error.toString(),
                code: "EDITAVISO_ERROR"
            })
        }
    }
}

module.exports = AvisosController