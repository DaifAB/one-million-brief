const router = require('express').Router()
const {getAllGroups,addGroup, joinGroup} = require('../controllers/group_members')
const {verifyParticipToken} = require('../controllers/tokenVerification/verifyToken')

router.route("/getAll").get(getAllGroups)
router.route("/add").post(verifyParticipToken,addGroup)
router.route("/join").post(verifyParticipToken,joinGroup)

module.exports = router