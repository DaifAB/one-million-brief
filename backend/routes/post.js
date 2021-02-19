const router = require('express').Router()
const {verifyToken} = require('../controllers/tokenVerification/verifyToken')

router.get('/',verifyToken ,(req,res) =>{
    res.json({
        posts: {
            title : 'My Post',
            description : 'random data shoudnt access'
        }
    })
})


module.exports = router