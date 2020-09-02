var mongoose = require("mongoose");

var Schema = mongoose.Schema,
    model = mongoose.model;

var userSchema = new Schema(
    {
    username: {
            type: String,
            trim: true,
            required: [true, 'Username is required.'],
            unique: true
          },
    email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
            lowercase: true,
            trim: true
          },
    passwordHash: {
        type: String,
        required: [true, 'Password is required.']
                  }, 

    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }]

    }, 
    {
    timestamps: true
    }
)

    module.exports = model("User", userSchema);