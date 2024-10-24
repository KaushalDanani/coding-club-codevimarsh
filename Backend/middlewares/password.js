const bcrypt = require("bcryptjs");

// userSchema.pre("save", async function (next) {
//     if(this.isModified("password"))
//     {
//         this.password = await bcrypt.hash(this.password, 10);
//         // console.log(`Now, Password is : ${this.password}`);
//     }
//     next();
// })

const hashPassword = async (req,res,next) => {
    const data = req.body;
    // console.log(data)
    
    // Check if password is being modified
    if (data.password) {

        // console.log('data',data.password)
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // console.log('heashed',hashPassword);
        // Update the password in the update document
        data.password = hashedPassword;
        req.password = hashedPassword;
    }
    // Call next to proceed with the operation
    next();
};

module.exports = hashPassword
