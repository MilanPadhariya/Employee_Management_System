module.exports=(sequelize,DataTypes) => {
    const Skill=sequelize.define('skills',{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    })

    return Skill;
}