var mongoose = require("mongoose");

var Schema = mongoose.Schema,
    model = mongoose.model;

    var reviewSchema = new Schema(
        {
            title: {type:String}, 
            movieName: {type: String}, 
            director: {type: String}, 
            review: {type: String}, 
            ranking: {type: String}, 
            user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
        }, 
        {
            timestamps: true
        }
    )

    module.exports = model("Review", reviewSchema);