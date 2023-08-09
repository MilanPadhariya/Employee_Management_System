
module.exports=(sequelize,DataTypes) => {

    const Leave=sequelize.define("leaves",{   
        leave_id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false
        },
        start_date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        end_date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        approval_date:{
            type:DataTypes.DATE
        },
        created_date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        hr_approval:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        team_lead_approval:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        seen_by_hr:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        seen_by_team_lead:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }   
    },
    {
        indexes:[
            {
                unique:true,
                fields:['user_id','start_date','end_date']
            }
        ]
    }
    );

    return Leave;
};