import userSchema from '../models/user.js'
const bcrypt = require("bcryptjs");

userSchema.pre("save", async function (next) {
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(`Now, Password is : ${this.password}`);
    }
    next();
})

userSchema.pre(["updateOne", "findByIdAndUpdate", "findOneAndUpdate"], async function (next) {
    const data = this.getUpdate();
    
    // Check if password is being modified
    if (data.password) {

        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Update the password in the update document
        data.password = hashedPassword;
    }
    // Call next to proceed with the operation
    next();
});
