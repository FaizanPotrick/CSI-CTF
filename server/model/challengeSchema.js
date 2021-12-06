const mongoose = require('mongoose');

const userFormat = new mongoose.Schema({
group_id : {
    type:String,
    required:true
},
a1 : {
    type:String,
    required:true
},
a2 : {
    type:String,
    required:true
},
timeStamp : {
    type:String,
    required:true
}
});
 const Challenge = mongoose.model('CHALLENGE',userFormat);
 module.exports = Challenge;