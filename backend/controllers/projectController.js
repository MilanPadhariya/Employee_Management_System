const {Project,User, Skill, Module}=require('../db/index');

exports.createProject=async(req,res)=>{
    try{
        const projectData={
            Name:req.body.name,
            company:req.body.company,
            repository:req.body.repository,
            starting_date: new Date()
        }

        const project=await Project.create(projectData);
        if(project){
            return res.status(201).json({
                messege:"new project created",
                data:project
            });
        }
    }
    catch(err){
        return res.status(500).json({
            messege:"error in creating project",
            error:err
        })
    }
};

exports.getAllProjects=async(req,res)=>{
    try{

        const projects=await Project.findAll(
            {
                attributes:{
                    exclude:['createdAt','updatedAt']
                },
                include:[
                    {
                        model:Module,
                        as:'modules',
                        attributes:['name','module_id'],

                    }
                ]
            }
        )

        if(projects){
            res.status(200).json(
                {
                    messege:'details of all projects',
                    results:projects.length,
                    data:projects
                }
            )
        }

    }
    catch(err){
        res.status(400).json(
            {
                messege:'error in finding projects',
                error:err
            }
        )

    }
};

exports.userAssign = async(req,res)=>{
    try{
        const module=await Module.findByPk(req.params.id);
        const employees=await User.findAll({
            where:{emp_id:req.body.employeeID.toString()}
        });

        console.log(module);
        console.log(employees);
        if(employees.length<=0){
            res.status(400).json(
                {
                    success:false,
                    messege:'no employee with like this found'
                }
            )
        }

        if(!module){
            res.status(400).json(
                {
                    success:false,
                    messege:'module not found',
                }
            )
        }
    
        const result=await module.addUsers(employees,{through:{starting_date:new Date()}});

        if(result){
            res.status(200).json(
                {
                    messege:'employee has been assigned the module successfully',
                    data:result
                }
            )
        }
    }
    catch(err){
        res.status(400).json(
            {
                success:false,
                messege:'error in assigning module',
                error:err
            }
        )
    }
};

exports.addModule = async(req,res)=>{
    try{
        const project=await Project.findByPk(req.params.id);
        console.log(req.body.modules);


        const createdModules=req.body.modules.map(async module=>{
            const createdModule=await Module.create({name:module});
            return createdModule;
        });

        Promise.all(createdModules).then(async module=>{
            console.log(module);
            const projectresult=await project.addModules(module);
            console.log(projectresult);

            if(projectresult){
                res.status(200).json(
                    {
                        success:true,
                        messege:'modules has been added to project successfully',
                        module:module
                    }
                )
            }
        })
    }
    catch(err){
        res.status(400).json(
            {
                messege:'error in adding module to project',
                error:err
            }
        )
    }
};

exports.getProjectDetails=async(req,res)=>{
    try{
        const project=await Project.findOne(
            {
                where: {project_id:req.params.id},
                include:[
                    {
                        model:Module,
                        as:'modules',
                        attributes:['name','module_id'],
                        include:
                            {
                                model:User,
                                attributes:['name','role','emp_id','email_id','profileImg'],
                                through:{attributes:['starting_date','ending_date']}
                            }
                    }
                ],
                attributes:['Name','company','repository','starting_date','ending_date','project_id']
            }
        );

        if(project){
            res.status(200).json(
                {
                    messege:"details of the project:",
                    details:project
                }
            )
        }
        else{
            res.status(200).json(
                {
                    success:false,
                    messege:"project not found",
                }
            )
        }
        
    }
    catch(err){
        res.status(400).json(
        {
            messege:'error in getting project details',
            error:err
        });
    }
};



