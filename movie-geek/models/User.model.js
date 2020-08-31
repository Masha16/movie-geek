var mongoose = require("mongoose");

var Schema = mongoose.Schema,
    model = mongoose.model;

var userSchema = new Schema(
    {username= {type: String}, 
    reviews=[{ type: Schema.Types.ObjectId, ref: 'Review' }]
    }, 
    {
    timestamps: true
    }
)





    module.exports = model("User", userSchema);