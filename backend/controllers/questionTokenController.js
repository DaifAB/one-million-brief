const QuestionToken = require("../models/question_token")
const Round = require('../models/round')
const Group = require('../models/group_members')
const Question = require('../models/question')
const {addRound} = require('./roundController')

exports.addQuestionToken = async (req,res) => {

    var id_question = req.body.id_question
    var id_participant = req.body.id_participant
    var participant_answer = req.body.participant_answer
    var score = 0

    const questionTokenExist = await QuestionToken.findOne({id_question : id_question})
    if (questionTokenExist) return res.status(400).send("Too late")

    const group_members = await Group.findOne({id_participant : id_participant})
    const question = await Question.findById(id_question)

    if (question.answer == participant_answer) score = 10

    const questionToken = new QuestionToken({
        id_question : id_question,
        id_participant : id_participant,
        participant_answer : participant_answer
    })

    try {
        const savedQuestionToken = await questionToken.save()
        const round = new Round({
            id_group_members : group_members._id,
            id_question : id_question,
            id_question_token : savedQuestionToken._id,
            score : score
        })
        try {
            const savedRound = await round.save()
             res.status(200).json([savedRound,savedQuestionToken])
        } catch (error) {
            res.status(500).send({message : error.message})
        }
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}