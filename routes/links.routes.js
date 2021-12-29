const {Router} = require('express')
// const config = require('config')
const Link = require('/home/valentin/Apps/ATOM/mern project/models/Link.js')
const router = Router();
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const {check, validationResult} = require('express-validator')

router.post('/generate',async (req,res) =>{
    try{
        
    }catch(e){console.log(e)
         res.status(500).json({message:"Что то пошло не так, попробуйте снова"})}

})

router.get('/',async (req,res) =>{
    try{
        const links = await Link.find({owner:null})//надо добавить пользоватля
        res.json(links)
    }catch(e){console.log(e)
         res.status(500).json({message:"Что то пошло не так, попробуйте снова"})}

})

router.get('/:id',async (req,res) => {
    try{
        const link = await Link.findById(req.params.id)
        res.json(link)
    }catch(e){console.log(e)
         res.status(500).json({message:"Что то пошло не так, попробуйте снова"})}
})

module.exports = router