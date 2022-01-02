const { Router } = require('express')
const config = require('config')
const Link = require('../models/Link.js')
const router = Router();
const auth = require("../middleware/auth.middleware")
const shortid = require('shortid')

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code})
        if (!link){
            return res.status(404).json('Link not found')
        }
        link.clicks++
        await link.save()
        return res.redirect(link.from)
        
    } catch (e) {
        res.status(500).json({ message: "Something went wrong"})

    }
})

module.exports = router