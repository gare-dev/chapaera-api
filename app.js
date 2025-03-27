const express = require("express")
require("dotenv").config();
const AnonMessageController = require("./controllers/AnonMessage");
const UsersController = require("./controllers/UsersController");
const verifyJWT = require("./middleware/verifyJWT");
const cors = require("cors")
const app = express()
const PORT = 3001

app.use(cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://www.chapaera.org"
    ]
}));

app.use(express.json())

app.post('/api/insertanonmessage', AnonMessageController.insertMessage)
app.post('/api/login', UsersController.usersLogin)

app.use(verifyJWT)

app.post('/api/createuser', UsersController.usersCreate)
app.post('/api/listmessage', AnonMessageController.listMessage)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

