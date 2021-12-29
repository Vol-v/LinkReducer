const {Schema,model,Types} = require('mongoose')
// просто sql схема
const schema = new Schema({
    email : {type: String, required: true,unique:true},
    password : {type: String, required: true},
    links: [{type : Types.ObjectId, ref:'Link'}] 
}) // Схема состоит из имэйла, пароля и линков. При этом линки -
   // это массив из записей в бд 
   // https://docs.mongodb.com/manual/reference/method/ObjectId/

module.exports = model('User',schema)