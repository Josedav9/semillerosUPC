let usuario = function(sequelize, Sequelize) {
  let modelo = sequelize.define(
    "Usuarios",{
      "idUsuario":{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
      },
      "nombreUsuario":{
        notEmpty:true,
        type:Sequelize.STRING
      },
      "emailUsuario":{
        notEmpty:true,
        type:Sequelize.STRING
      },
      "claveUsuario":{
        notEmpty:true,
        type:Sequelize.STRING
      },
    },
    {
      timestamps:false,
      freezeTableName:true
    }
  );
  return modelo;
};
module.exports = usuario;
