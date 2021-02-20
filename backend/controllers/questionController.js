const Question = require("../models/question.js")

exports.questionAdd = async (req,res) =>{

    const question = new Question({
        quest : req.body.quest ,
        answer : req.body.answer,
        false_choises : req.body.false_choises,
        points : req.body.points
    })

    try {
        
        const savedQuestion = await question.save()
        res.send(savedQuestion)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.getAllQuestions = async (req,res) => {
    try {
        questions = await Question.find()
        res.json(questions)
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}