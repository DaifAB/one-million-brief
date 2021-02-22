const Group = require('../models/group_members')
const Participant = require('../models/participant')

exports.getAllGroups = async (req,res) => {
    try {
        const groups = await Group.find()
        res.json(groups)
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}

exports.getGroupByCode = async (req,res) => {
    var group_participants = []

    try {
        const groups = await Group.aggregate([
            {
                $match : {group_code :req.body.group_code}
            },
            { $lookup:
               {
                 from: 'participants',
                 localField: 'id_participant',
                 foreignField: '_id',
                 as: 'participant'
               }
             }
            ])
        groups.map(object => {
            group_participants.push(object.participant[0])
        })

        var bestScore = Math.max.apply(Math,group_participants.map(function(participant){return participant.score;}))
        var finalWinner = group_participants.find(function(o){ return o.score == bestScore; })

        res.json([inalWinner,{message: "Congrtaz, your are a millionnaire"}])

    } catch (error) {
        res.status(500).send({message : error.message})
    }
}

exports.addGroup = async (req,res) => {

    const id_participant =  req.body.id_participant
    const participant = await Participant.findOne({_id : id_participant})

    //FIRST WE CHECK PARTICIPANT VALIDATION
    if (participant.is_valid) {
        const group = new Group({
            id_participant : participant._id,
            group_code : Math.floor(1000 + Math.random() * 9000)
        })

        try {
            const newGroup = await group.save()
            res.status(201).json(newGroup)
        } catch (error) {
            res.status(500).send({message : error.message})
        }
    } else {
        res.send({message : "Your participation is not valid yet"})
    }

}
exports.joinGroup = async (req,res) => {
    const group_code = req.body.group_code
    const id_participant =  req.body.id_participant
    const participant = await Participant.findOne({_id : id_participant})
    //CHECKING PARTICIPANT VALIDATION
    if(participant.is_valid == false) return res.status(400).send("Your participation is not valid yet")
            //CHECKING GROUP EXISTENCE
            const groupExist = await Group.findOne({group_code : group_code})
            if(!groupExist) return res.status(400).send("Group dosen't exist, please create group first")

            //CHECKING GROUP CAPACITY
            Group.countDocuments({group_code : group_code}, async (err,c)=>{
            if (c<4) {
                const group = new Group({
                    id_participant : id_participant,
                    group_code : groupExist.group_code
                })

                try {
                    const newGroup = await group.save()

                    Group.countDocuments({group_code : group_code}, async (err,c)=>{
                        if(c == 4) {res.send('Game started get your question /question/randomQuestion')}
                        else {res.send("waiting for other players")}


                    })

                } catch (error) {
                    res.status(500).send({message : error.message})
                }
            } else {
                res.send({message : "Group is Full"})
            }
       })

}

