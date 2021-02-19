const router = require('express').Router()

const { participRegister, participLogin, participValidation} = require('../controllers/participant')
const {verifyToken} = require('../controllers/tokenVerification/verifyToken')

router.route("/register").post(participRegister)
router.route("/login").post(participLogin)
router.route("/validateParticipant/:id").patch(participValidation)
module.exports = router