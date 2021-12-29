const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = (req,res,next) => {
    if (req.method === 'OPTIONS'){ // спец метод из RestAPIпроверяющий доступность сервера
        return next()
    }
    try {
        const token = req.headers.authorization // специалньое поле хэдэра
                                                // строка вида "Bearer TOKEN"
        token = token.split(" ")[1]
        if (!token) {
            res.status(401).json({message: "Пользователь не авторизован"})
        }
        const decoded = jwt.verify(token, config.get("jwtSecret"))
        req.user = decoded
        next()
    }catch(e) {
        res.status(401).json({message: "Ошибка верификации токена"})

    }
}