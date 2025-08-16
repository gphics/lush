const createUser = require("./createUser");
const getUser = require("./getUser");
module.exports = [
    {action:createUser, method:"post", path:"/create"},
    {action:getUser, method:"get", path:""},
]

