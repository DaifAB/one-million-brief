const router = require('express').Router()
const {questionAdd,getAllQuestions, getRandomQuestion} = require('../controllers/questionController')
const {verifyAdminToken,verifyParticipToken} = require('../controllers/tokenVerification/verifyToken')

router.route('/add').post(verifyAdminToken,questionAdd)
router.route('/getAll').get(verifyAdminToken,getAllQuestions)
router.route('/randomQuestion').get(verifyParticipToken,getRandomQuestion)

module.exports = router