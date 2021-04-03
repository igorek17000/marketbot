var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
originalname: String,	
data: Buffer,	 
img : { pic: Buffer },	
contentType: String, 
uploaded: String,
    caption: {
        required: true,
        type: String,
    },
    filename: {
        required: true,
        type: String,
    },
    fileId: {
        required: true,
        type: String,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
});

var Image1 = mongoose.model('image2', ImageSchema);

module.exports = Image1;
