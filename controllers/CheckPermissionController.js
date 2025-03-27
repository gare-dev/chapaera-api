const CheckPermissionModel = require("../models/CheckPermissionModel")
const jwt = require("jsonwebtoken");


const CheckPermissionController = {
    checkPermission: async (req, res) => {
        const jwtToken = jwt.decode(req.headers["authorization"]);


        try {
            const response = await CheckPermissionModel.checkPermission(jwtToken.login)

            if (response.rowCount === 1) {
                return res.status(200).json({
                    message: "Access Granted",
                    auth: true
                })
            }
            return res.status(403).json({
                message: "Access Denied",
                auth: false
            })
        } catch (error) {

            return res.status(501).json({
                message: "Error ocurred while trying to checkpermission",
                error_message: error.toString(),
                code: "PERMISSION_ERROR"
            })
        }
    }
}

module.exports = CheckPermissionController