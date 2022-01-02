console.log('Hello,world!')
const express = require('express') //подкючаем пакет экспресс
const config = require('config')
const monogoose = require('mongoose')



const app = express() // будущий сервер
const PORT = config.get('port') || 5000 //npm config

app.use(express.json({extended: true})) // мидлвэр для парсинга реквеста в json

app.use('/api/auth',require('./routes/auth.routes')) // router
app.use('/api/link',require("./routes/links.routes"))
app.use('/t',require('./routes/redirect.routes'))
async function connectToMongoDB() {
    try{
       await monogoose.connect(config.get('mongoUri'),{})
       app.listen(PORT, () => console.log("App is running on port " + PORT +"...")) // первое - порт, второе - колбэк

    } catch(e){
        console.log('Server Error: ',e.message)
        process.exit(1) // global объект ноды
    }

}

connectToMongoDB();
