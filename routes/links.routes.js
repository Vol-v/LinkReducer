const {Router} = require('express')
const config = require('config')
const Link = require('../models/Link.js')
const router = Router();
const auth = require("../middleware/auth.middleware")
const shortid = require('shortid')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const {check, validationResult} = require('express-validator')

router.post('/generate',auth,async (req,res) =>{
    try{
        const baseUrl = config.get('baseUrl')
        const {from} = req.body
        const code = shortid.generate()
        const existing = await Link.findOne({from})//проверяем есть ли такая ссылка в базе
        if (existing){
            return res.json({link:existing})
        }
        const to = baseUrl + '/t/' + code
        const link = new Link({code,to,from,owner:req.user.userId})
        await link.save()
        res.status(201).json({link}) //201 - created
    }catch(e){console.log(e)
         res.status(500).json({message:"Something went wrong"})}

})

router.get('/',auth,async (req,res) =>{
    try{
        const links = await Link.find({owner:req.user.userId})//берется из middleware
        res.json(links)
    }catch(e){console.log(e)
         res.status(500).json({message:"Something went wrong"})}

})

router.get('/:id',auth,async (req,res) => {
    try{
        const link = await Link.findById(req.params.id)
        res.json(link)
    }catch(e){console.log(e)
         res.status(500).json({message:"Something went wrong"})}
})

module.exports = router