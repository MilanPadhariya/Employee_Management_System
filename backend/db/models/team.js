module.exports=(sequelize,DataTypes) => {
    const Team=sequelize.define('teams',{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        team_id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false,
            primaryKey:true
        }
    });

    return Team;
};