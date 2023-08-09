module.exports=(sequelize,DataTypes) => {
    const Module=sequelize.define('modules',{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        module_id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false
        },
    })

    return Module;
}