const Round = require('../models/round')

exports.addRound = async (req,res) => {

    const round = new Round({
        id_group_members : req.body.id_group_members,
        id_question : req.body.id_question,
        id_question_token : req.body.id_question_token,
        score : req.body.score

    })

    try {
        const savedRound = await round.save()
        res.status(201).json(savedRound)
    } catch (error) {
        res.status(500).send({message : error.message})
        
    }
}