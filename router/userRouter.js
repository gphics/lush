const express = require("express")
const userCtrl = require("../controllers/userCtrl")
const userRouter = express.Router()

userCtrl.map(({action, method, path}) => {
    userRouter[method](path, action)
})
module.exports = userRouter

