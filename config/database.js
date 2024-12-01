const Sequelize=require('sequelize');

const sequelize=new Sequelize('user-manage','root','Chintu5050@',{
    host:'localhost',
    dialect:'mysql'
});

module.exports=sequelize;