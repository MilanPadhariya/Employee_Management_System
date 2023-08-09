const Sequelize=require('sequelize');
const dbConfig=require('../config/db.config');

const sequelize =new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases:false,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.aquire,
        idle:dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.User=require('./models/user')(sequelize,Sequelize);
db.Leave=require('./models/leave')(sequelize,Sequelize);
db.Team=require('./models/team')(sequelize,Sequelize);
db.Project=require('./models/project')(sequelize,Sequelize);
db.Module_Employee=require('./models/work')(sequelize,Sequelize);
db.Skill=require('./models/skill')(sequelize,Sequelize);
db.User_skill=require('./models/user_skill')(sequelize,Sequelize);
db.Module=require('./models/module')(sequelize,Sequelize);

db.User.hasMany(db.Leave,{as:'leaves'});
db.Leave.belongsTo(db.User,{
    foreignKey:'user_id',
    as:'user'
});

db.Team.hasMany(db.User,{as:'members'});
db.User.belongsTo(db.Team,{
    foreignKey:'team_id',
    as:'team'
});

db.User.belongsToMany(db.Skill,{through:db.User_skill});
db.Skill.belongsToMany(db.User,{through:db.User_skill});

db.User.belongsToMany(db.Module,{through : db.Module_Employee});
db.Module.belongsToMany(db.User,{through : db.Module_Employee});

db.Project.hasMany(db.Module,{as:'modules'});
db.Module.belongsTo(db.Project);

module.exports=db;