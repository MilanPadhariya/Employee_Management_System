const {Team}=require('../db/index');

exports.createTeam=async(req,res)=>{
    try{
        const teamData={
            name:req.body.name
        }
        const team=await Team.create(teamData);
        if(team){
            return res.status(201).json({
                messege:"new team created",
                data:team
            })
        }
    }
    catch(err){
        return res.status(500).json({
            messege:"error in creating team",
            error:err
        })
    }
};

exports.getAllTeams=async(req,res)=>{
    try{
        const teams=await Team.findAll({
            attributes:['name','team_id']
        });
        if(teams){
            return res.status(200).json({
                messege:"all teams fetched",
                data:teams
            })
        }
    }
    catch(err){
        return res.status(500).json({
            messege:"error in fetching all teams",
            error:err
        })
    }
};

