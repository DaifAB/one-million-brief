const router = require('express').Router()

const { participRegister, participLogin } = require('../controllers/participant')

router.route("/register").post(participRegister)
router.route("/login").post(participLogin)

module.exports = router