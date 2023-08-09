const {User,Project,Skill, Module, Sequelize, Team}=require('../db/index');
const Op=require('sequelize').Op
// const multer=require('multer');

exports.createUser=async(req,res)=>{
    try{    
        const yearOfBirth=parseInt(req.body.date_of_birth.substring(0,4));
        const currentYear=new Date().getFullYear();
        const age=currentYear-yearOfBirth-1;
    
        const userData={
            name:req.body.name,
            age:age,
            gender:req.body.gender,
            dob:req.body.date_of_birth,
            ph_no:req.body.phone_number,
            email_id:req.body.email_id,
            hiring_date:new Date(),
            role:req.body.role,
            password:req.body.password,
            team_id:req.body.team_id
        };
    
        const createduser=await User.scope('withoutPassword').create(userData);

        if(createduser){
            res.status(201).json(
                {
                    message:"new user added",
                    data:createduser
                }
            )
        }
    }
    catch(err){
        res.status(409).json(
            {
                messege:"failed to add new user",
                error:err
            }
        )
        
    }
};

exports.addSkills=async(req,res)=>{
    try{
        // console.log("id:::",req.params.id);
        // console.log("skills:::",req.body.skills);

        user=await User.findByPk(req.user.emp_id);
        if(!user){
            return res.status(400).json(
                {
                    success:false,
                    message:"User not found"
                }
            )
        }

        existingSkills=await Skill.findAll(
            {
                where:{
                    name:req.body.skills
                }
            }
        )

        existingSkillNames=existingSkills.map((skill)=>skill.name);
        newSkillNames=req.body.skills.filter((skill)=>!existingSkillNames.includes(skill));

        // console.log('existingSkillName:::',existingSkillNames);
        // console.log('newSkillName:::',newSkillNames);

        createdSkills=newSkillNames.map(async (skillName)=>{
            const createdSkill= await Skill.create({name:skillName});
            return createdSkill;
        })

        // console.log('createdSkills:::',createdSkills);
        // console.log("existingSkills:::",existingSkills);

        Promise.all([...createdSkills,...existingSkills]).then(async (result)=>{
            skilledUser=await user.addSkills(result)
        })

        return res.status(201).json(
            {
                success:1,
                message:"skills added"
            }
        )
    }
    catch(err){
        return res.status(404).json(
            {
                success:0,
                error:err
            }
        )
    }
}
  
const multer = require("multer");
const upload = multer();
const file = upload.single("myFile");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');

// Assuming you have set up your Cloudinary configuration elsewhere
cloudinary.config({
  cloud_name: 'duxcvv4av',
  api_key: '368224939778735',
  api_secret: '8zgUjS97LPznpFMSMPtTzGtDuR8'
});

exports.uploadProfileImg = (req, res, next) => {
  try {
    file(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: 'Multer error: ' + err.message });
      }

      console.log('Body: ', req.body);
      console.log('File: ', req.file);

      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      async function upload1(req) {
        try {
          let result = await streamUpload(req);
          console.log(result);
        // embedUrl(result,req,res);
        // console.log("userId::",req.user.emp_id);
        // console.log("fileUrl::",result.url);

        const user=await User.findByPk(req.user.emp_id);
        user.set({
            profileImg:result.url
        });
        updatedUser=await user.save();

        } catch (error) {
          console.error('Cloudinary error:', error);
        }
      }

      upload1(req);

      return res.json({
        success: true,
        message: "image changed successfully"
      });
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: err
    });
  }
};

    
exports.getAllUsers=async(req,res)=>{
    try{
        let users;
        if(req.query){
            users=await User.scope('withoutPassword').findAll(
                {
                    where:req.query
                }
            )
        }
        else{
            users=await User.findAll(
                {
                    attributes:{
                        exclude:['password','createdAt','updatedAt']
                    }
                }
            )
        }

        if(users){
            res.status(200).json(
                {
                    messege:'details of all users',
                    results:users.length,
                    data:users
                }
            )
        }

    }
    catch(err){
        res.status(400).json(
            {
                messege:'error in finding users',
                error:err
            }
        )

    }
};

exports.getUserDetails=async(req,res)=>{
    try{
        const user= await User.findByPk(req.params.id,{
            include:[                
                {
                    model:Team,
                    as:'team'
                },
                {
                    model:Skill,
                    attributes:['name']
                },
            ]
        });

        if(user){
            res.status(200).json(
                {
                    success:1,
                    user: user
                }
            )
        }
    }
    catch(err){
        res.status(404).json(
            {
                success:0,
                messege:"user not found"
            }
        )
    }
}

exports.assignTeam=async(req,res)=>{
    try{
        const user=await User.findByPk(req.params.id);

        if(!user){
            return res.status(404).json(
                {
                    messege:'user doesnot exist'
                }
            )
        }

        let assignedUser;
        if(req.body.team && user){
            user.set({
                team_id:req.body.team
            });
            assignedUser=await user.save();
        }

        if(assignedUser){
            return res.status(200).json({
                messege:'team assigned to user',
                data:assignedUser
            });
        }
    }
    catch(err){
        return res.status(500).json(
            {
                messege:'error in assigning team',
                error:err
            }
        );
    }
};

exports.myProjects=async(req,res) => {
    try{
        console.log(Module.associations);
        console.log(Project.associations);
        const userDetails=await User.findOne(
            {
                where:{emp_id:req.user.emp_id},
                include:[
                    {
                        model:Module,
                        as:'modules',
                        attributes:['name','module_id'],
                        include:[{
                            model:Project,
                            as:'project',
                        }]
                    },
                ]
            }
        )
        if(userDetails){
            res.status(200).json(
                {
                    success:true,
                    modules:userDetails.modules
                }
            )
        }
    }
    catch(err){
        res.status(500).json(
            {
                messege:"error in fetching the projects",
                error:err
            }
        )
    }

};
