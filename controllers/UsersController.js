const jwt = require("jsonwebtoken");
const UsersModel = require("../models/UsersModel");
const AccessLogModel = require("../models/AccessLogModel");
const UsersLogModel = require("../models/UsersLogModel");

const UsersController = {
    usersLogin: async (req, res) => {
        const { login, password } = req.body

        if (!login || !password) {
            return res.status(404).json({
                message: "Missing login or password",
                code: "MISSING_INFO"
            })
        }

        try {
            const response = await UsersModel.UsersLogin(login, password)

            if (response.rowCount === 1) {
                const token = jwt.sign(
                    { login: response.rows[0].login },
                    process.env.SECRET,
                    {
                        expiresIn: 36000,
                    }
                )

                AccessLogModel.insertLog(login, password, true)

                return res.status(200).json({
                    message: "Logged successfully.",
                    token: token,
                    auth: true
                })
            }

            AccessLogModel.insertLog(login, password, false)
            return res.status(404).json({
                message: "Wrong username or password.",
                code: "WRONG_INFO",
            });
        } catch (error) {
            return res.status(501).json({
                message: "Error ocurred while trying to login.",
                error_message: error,
                code: "LOGIN_ERROR"
            })

        }
    },
    usersCreate: async (req, res) => {
        const { login, password, description } = req.body
        const jwtToken = jwt.decode(req.headers["authorization"]);



        if (!login || !password || !description) {
            return res.status(404).json({
                message: "Missing info",
                code: "MISSING_INFO"
            })
        }

        try {
            const response = await UsersModel.createUser(login, password, description)

            if (response.rowCount === 1) {

                UsersLogModel.insertLog(jwtToken.login, login, password, description, true)

                return res.status(201).json({
                    message: "User created successfully!",
                    code: "USER_CREATED"
                })
            }
        } catch (error) {
            if (error.code === "23505") {
                UsersLogModel.insertLog(jwtToken.login, login, password, description, false)
                return res.status(404).json({
                    message: "User already exists.",
                    code: "INVALID_USERNAME"
                })
            }
            return res.status(501).json({
                message: "Error ocurred while trying to create user",
                error_message: error,
                code: "LOGIN_ERROR"
            })
        }
    },

}

module.exports = UsersController