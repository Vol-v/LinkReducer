const {Schema,model,Types} = require('mongoose')
// просто sql схема
const schema = new Schema({
    from : {type: String, required: true},
    to : {type: String, required: true,unique: true},
    code: {type : String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    clicks: {tyoe:Number,default: 0},
    owner: {type:Types.ObjectId,ref: "User"}
}) // ссылка состоит из изначального адреса, самого названия ссылки, кода,
    // даты создания, количества кликов и пользователя(PK и FK)
module.exports = model('Link',schema)