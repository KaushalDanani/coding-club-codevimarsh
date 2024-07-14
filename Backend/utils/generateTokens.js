const jwt = require('jsonwebtoken')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const generateAuthToken = async function() {
    try {
        const token = jwt.sign({_id:this._id.toString(), email:this.email}, process.env.REACT_APP_SECRET_TOKEN_KEY);

        // this.tokens = this.tokens.concat({token: token});
        // await this.save();

        return token;
    } catch (err) {
        res.send("The error is "+err)
    }
}

module.exports = generateAuthToken;