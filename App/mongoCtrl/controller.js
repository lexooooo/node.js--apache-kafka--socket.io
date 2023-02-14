const schema = require("./schema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




module.exports.updater = async (req, res) => {
 
    const findAll = await schema.find({});
    
    socket.emit("message", findAll)

    findAll ? res.send("its done") : null ; 
}