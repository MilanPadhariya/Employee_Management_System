const {Leave}=require('../db/index');
const {User}=require('../db/index');
const {Op}=require('sequelize');

exports.createLeave=async(req,res)=>{
    try{    
        const user=await User.findByPk(req.user.emp_id);
        const team=user.dataValues.team_id;

        if(!team){
            return res.status(401).json(
                {
                    messege:"you are not assigned a team. Please make sure to get a team alloted to request the leave"
                }
            );
        }

        const data={
            user_id: req.user.emp_id,
            created_date:Date.now(),
            start_date:req.body.st_date,
            end_date:req.body.end_date
        };
    
        const createdLeave=await Leave.create(data);
        
        if(createdLeave){
            return res.status(201).json(
                {
                    success: true,
                    messege:"leave generated",
                    data:createdLeave
                }
            )
        }
    }
    catch(err){
        return res.status(404).json(
            {
                success: false,
                messege:"error in generating leave",
                error:err
            }
        )
    }
};

exports.getMyLeaves=async(req,res)=>{
    try{
        const leaves=await Leave.findAll({
            where:{
                user_id:req.user.emp_id
            },
            // attributes:['leave_id','start_date','end_date','approval_date','seen_by_hr','seen_by_team_lead']
            include:[
                {
                    model:User,
                    as:'user'
                }
            ]
        });
        if(leaves){
            return res.status(200).json(
                {
                    messege:"your leaves till now",
                    length:leaves.length,
                    data:leaves
                }
            )
        }
    }
    catch(err){
        return res.status(404).json(
            {
                messege:"error in fetching leaves",
                error:err
            }
        )
    }
};

exports.getMyApprovedLeaves=async(req,res)=>{
    try{
        const approvedleaves=await Leave.findAll({
            where:{
                user_id:req.user.emp_id,
                hr_approval:true,
                team_lead_approval:true,
                seen_by_hr:true,
                seen_by_team_lead:true
            }
        })
        if(approvedleaves){
            return res.status(200).json(
                {
                    messege:"your approved leaves till now",
                    length:approvedleaves.length,
                    data:approvedleaves
                }
            )
        }
    }
    catch(err){
        return res.status(404).json(
            {
                messege:"error in fetching leaves",
                error:err
            }
        )
    }
};

exports.getMyUnapprovedLeaves = async(req,res)=>{
    try{
        const unapprovedleaves=await Leave.findAll({
            where:{
                user_id:req.user.emp_id,
                seen_by_hr:true,
                seen_by_team_lead:true,
                approval_date:null
            }
        });
        if(unapprovedleaves){
            return res.status(200).json(
                {
                    messege:"your unapproved leaves till now",
                    length:unapprovedleaves.length,
                    data:unapprovedleaves
                }
            )
        }
    }
    catch(err){
        return res.status(404).json(
            {
                messege:"error in fetching leaves",
                error:err
            }
        )
    }
};

exports.getMypendingLeaves = async(req,res)=>{
    try{
        const pendingLeaves=await Leave.findAll({
            where:{
                user_id:req.user.emp_id,
                [Op.or]:[
                    {seen_by_hr:false},
                    {seen_by_team_lead:false}
                ]
            }
        });
        if(pendingLeaves){
            return res.status(200).json(
                {
                    messege:"your pending leaves till now",
                    length:pendingLeaves.length,
                    data:pendingLeaves
                }
            )
        }
    }
    catch(err){
        return res.status(404).json(
            {
                messege:"error in fetching leaves",
                error:err
            }
        )
    }
};

exports.getUnapprovedLeaves=async(req,res)=>{
    try{
        // for hr and leam lead

        let unapprovedLeaves;
        //if it is hr then do steps for hr approval   
        if(req.user.role==='hr'){
            unapprovedLeaves=await Leave.findAll({
                include:{
                    model:User,
                    as:'user',
                    attributes:{
                        exclude:['emp_id','hiring_date','password','createdAt','updatedAt','teamTeamId','team_id']
                    }
                },
                where:{
                    hr_approval:false,
                    seen_by_hr:false
                },
                attributes:{
                    exclude:['created_date','hr_approval','team_lead_approval','seen_by_hr','seen_by_team_lead','createdAt','updatedAt','userEmpId']
                }
            })
        }     
        //if it is team lead then do steps for team lead approval
        if(req.user.role==='team_lead'){
            unapprovedLeaves=await Leave.findAll(
                {
                    include:{
                        model:User,
                        as:'user',
                        where:{
                            team_id:req.user.team_id
                        },
                        attributes:{
                            exclude:['emp_id','hiring_date','password','createdAt','updatedAt','teamTeamId','team_id']
                        }
                    },
                    where:{
                        team_lead_approval:false,
                        seen_by_team_lead:false
                    },
                    attributes:{
                        exclude:['created_date','hr_approval','team_lead_approval','seen_by_hr','seen_by_team_lead','createdAt','updatedAt','userEmpId']
                    }
                },
            );
        }

        if(unapprovedLeaves){
            return res.status(200).json(
                {
                    messege:"following leaves needs to be viewed",
                    total:unapprovedLeaves.length,
                    data:unapprovedLeaves
                }
            )
        }
    }
    catch(err){
        return res.status(404).json(
            {
                messege:"error in fetching leaves",
                error:err
            }
        )
    }
};

exports.approveLeave = async(req,res) => {
    try{
        const leave=await Leave.findByPk(req.params.id);
        
        if(!leave){
            return res.status(404).json(
                {
                    messege:"leave not found"
                }
            )
        }

        let viewedLeave;
        if(req.body && req.user.role){
            if(req.user.role==='hr'){
                leave.set(
                    {
                        hr_approval:req.body.approval,
                        seen_by_hr:true
                    }
                )
                viewedLeave=await leave.save();
            }
            if(req.user.role==='team_lead'){
                leave.set(
                    {
                        team_lead_approval:req.body.approval,
                        seen_by_team_lead:true
                    }
                )
                viewedLeave=await leave.save();
            }
        };

        if(viewedLeave.hr_approval && viewedLeave.team_lead_approval){
            leave.set({
                approval_date:Date.now()
            })
            viewedLeave=await leave.save();
        }

        if(viewedLeave){
            return res.status(200).json(
                {
                    messege:"leave viewed",
                    data:viewedLeave
                }
            )
        }
    }
    catch(err){
        return res.status(404).json(
            {
                messege:"error in approving leave",
                error:err
            }
        )
    }
};

exports.getLeavesOfEmployee=async(req,res)=>{
    try{
        const leaves=await Leave.findAll(
            {
                where:{user_id:req.params.id}
            }
        )

        if(leaves){
            res.status(200).json(
                {
                    messege:"leaves of the employee: ",
                    length:leaves.length,
                    data:leaves
                }
            )
        }
    }
    catch(err){
        res.status(404).json(
            {
                messege:"error in getting leaves of employee",
                error:err
            }
        )
    }

};
