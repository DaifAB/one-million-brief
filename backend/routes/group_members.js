const router = require('express').Router()
const {getAllGroups,addGroup, joinGroup, getGroupByCode} = require('../controllers/group_membersController')
const {verifyParticipToken} = require('../controllers/tokenVerification/verifyToken')

router.route("/getAll").get(getAllGroups)
router.route("/add").post(verifyParticipToken,addGroup)
router.route("/join").post(verifyParticipToken,joinGroup)
router.route("/finalWinner").get(getGroupByCode)


module.exports = router