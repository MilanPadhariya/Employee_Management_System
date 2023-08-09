module.exports=(sequelize,DataTypes) => {
    const Module_Employee=sequelize.define('works',{

        starting_date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        ending_date:{
            type:DataTypes.DATE,
        }

    },{timestamps:false});

    return Module_Employee;
};