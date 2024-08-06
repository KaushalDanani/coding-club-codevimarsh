const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const generateAuthToken = async function(userData) {
    try {
        const token = jwt.sign({_id:userData._id.toString(), email:userData.email}, process.env.REACT_APP_SECRET_TOKEN_KEY);

        // this.tokens = this.tokens.concat({token: token});
        // await this.save();

        return token;
    } catch (err) {
        res.send("The error is "+err)
    }
}

module.exports = generateAuthToken;