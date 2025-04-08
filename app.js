const express = require("express")
require("dotenv").config();
const AnonMessageController = require("./controllers/AnonMessage");
const UsersController = require("./controllers/UsersController");
const verifyJWT = require("./middleware/verifyJWT");
const cors = require("cors");
const CheckPermissionController = require("./controllers/CheckPermissionController");
const MatchesController = require("./controllers/MatchesController");
const AvisosController = require("./controllers/AvisosController");
const ResultsTableController = require("./controllers/ResultsTableController");
const PointsTableMController = require("./controllers/PointsTableMController");
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
app.post('/api/creatematch', MatchesController.insertMatch)
app.post('/api/consultmatch', MatchesController.consultMatchDate)
app.post('/api/getmatches', MatchesController.getMatches)
app.post('/api/listaviso', AvisosController.listAviso)
app.post('/api/listresultM', PointsTableMController.listTableM)

app.use(verifyJWT)

app.post('/api/getaprovedmatch', MatchesController.getAprovedMatches)
app.post('/api/aprovematch', MatchesController.aproveMatch)
app.post('/api/createuser', UsersController.usersCreate)
app.post('/api/listmessage', AnonMessageController.listMessage)
app.post('/api/checkpermission', CheckPermissionController.checkPermission)
app.post('/api/markasvisu', AnonMessageController.markAsVisualized)
app.post('/api/createaviso', AvisosController.insertAviso)
app.post('/api/deleteaviso', AvisosController.deleteAviso)
app.post('/api/editaviso', AvisosController.editAviso)
app.post('/api/insertresult', ResultsTableController.insertResults)



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

