const {Router} = require('express')
const config = require('config')
const User = require('/home/valentin/Apps/ATOM/mern project/models/User.js')
const router = Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')

//api/auth/register
router.post(
    '/register', 
    [
        check('email',"Некорректный email").isEmail(), // это все из экспресс валидатора
        check('password',"Минимальня длина пароля - 6 символов").isLength({min: 6})

    ],
    async (req,res) =>{
    
        
    try{
        //npm express-validator
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при регистрации"
            })
        }
        const {email,password} = req.body;
        const candidate = await User.findOne({email}) // User - это по сути БД. Ищем в бд такой эмэйл и если он есть- не создаем пользователя

        if (candidate){
            return res.status(400).json({message: "Такой пользователь существует"})
        }
        //npm bcrypt
        const hashedPassword = await bcrypt.hash(password,12) // Хэшируем пароль.второй параметр - salt
        const user = new User({email,password: hashedPassword})

        await user.save()
        res.status(201).json({message: "Пользователь создан"})
        
    }catch(e){res.status(500).json({message:"Что то пошло не так, попробуйте снова"})}
                  //через респонс передается статус ошибки(в данном случае 500) и жсон файл с сообщением
})
//api/auth/login
router.post(
    '/login',
    [
        check('email',"Введите корректный email").normalizeEmail().isEmail(),
        check('password',"Введите пароль").exists()

    ],
    async (req,res) =>{
        try{
            //npm express-validator
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при входе в систему"
                })
            }
            const {email,password} = req.body;
            const usr = await User.findOne({email}) // User - это по сути БД. Ищем в бд такой эмэйл и если он есть- не создаем пользователя
            if (!usr){
                return res.status(400).json({message:"Пользователь не найден"})
            }
            const isMatch = await bcrypt.compare(password,usr.password)
            if(!isMatch){
                return res.status(400).json({message:"Неверный пароль"})
            }
            //npm jsonwebtoken
            const token = jwt.sign(
                {userId: usr.id},
                config.get("jwtSecret"),
                {expiresIn: '1h'}
            )
            return res.json({token,userId: usr.id, message: "Добро пожаловать!"})
            
        }catch(e){console.log(e)
             res.status(500).json({message:"Что то пошло не так, попробуйте снова"})}
                      //через респонс передается статус ошибки(в данном случае 500) и json файл с сообщением
    })

module.exports = router;