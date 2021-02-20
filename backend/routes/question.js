const router = require('express').Router()
const {questionAdd,getAllQuestions} = require('../controllers/questionController')
const {verifyAdminToken} = require('../controllers/tokenVerification/verifyToken')

router.route('/add').post(verifyAdminToken,questionAdd)
router.route('/getAll').get(verifyAdminToken,getAllQuestions)

module.exports = router