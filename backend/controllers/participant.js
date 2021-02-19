const Participant = require('../models/participant')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {participantRegisterSchema,participantLoginSchema} = require('./validation/validationSchema')

exports.participRegister = async(req, res, next) => {

    //VALIDATE DATA BEFORE SAVE PARTICIPANT
    const {error} = participantRegisterSchema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //CHECK IF PARTICIPANT ALREADY EXIST
    const phoneExist = await Participant.findOne({phone : req.body.phone})
    if (phoneExist) return res.status(400).send('Phone already exist')

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Save Participant
    const participant = new Participant({
        full_name : req.body.full_name,
        age : req.body.age,
        is_valid : false,
        online : false,
        phone : req.body.phone,
        password : hashedPassword
    })

    try {
        const savedParticipant = await participant.save()
        res.send(savedParticipant)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.participLogin = async (req, res, next) => {

     //VALIDATE DATA BEFORE LOGIN
     const {error} = participantLoginSchema.validate(req.body)
     if (error) return res.status(400).send(error.details[0].message)

     //CHECK IF PARTICIPANT ALREADY EXIST
    const participant = await Participant.findOne({phone : req.body.phone})
    if (!participant) return res.status(400).send('Phone is not found')

    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password,participant.password)
    if (!validPass) return res.status(400).send('Invalid password')

    //Create and assign a token
    const token = jwt.sign({_id : participant._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
}