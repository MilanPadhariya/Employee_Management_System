
module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define("users",{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        role:{
            type:DataTypes.ENUM(
                {
                    values:['employee','hr','director','team_lead']
                }
            ),
            allowNull:false
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        emp_id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false
        },
        gender:{
            type:DataTypes.ENUM(
                {
                    values:['male','female','others']
                }
            ),
            allowNull:false
        },
        dob:{
            type:DataTypes.DATE,
            allowNull:false
        },
        ph_no:{
            type:DataTypes.STRING,
            validate:{
                len:[10,10]
                // is:["^[9-7]{1}\d*$",'i']
            },
            allowNull:false
        },
        email_id:{
            type:DataTypes.STRING,
            validate:{
                isEmail:true
            },
            unique:true
        },
        hiring_date:{
            type:DataTypes.DATE
        },
        password:{
            type:DataTypes.STRING,
            validate:{
                len:[8,15]
            },
            allowNull:false
        },
        profileImg:{
            type:DataTypes.STRING,
            defaultValue:'https://img.freepik.com/premium-vector/flat-instagram-icons-notifications_619991-50.jpg'
        }
    },
    {
        scopes:{
            withoutPassword:{
                attributes:{exclude:['password','createdAt','updatedAt','teamTeamId']}
            }
        }
    }
    );
    return User;
};