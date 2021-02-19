const router = require('express').Router()

const { participRegister, participLogin, participValidation} = require('../controllers/participantController')
const {verifyParticipToken, verifyAdminToken} = require('../controllers/tokenVerification/verifyToken')

router.route("/register").post(participRegister)
router.route("/login").post(participLogin)
router.route("/validateParticipant/:id").patch(verifyAdminToken,participValidation)
module.exports = router