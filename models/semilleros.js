let semillero = function(sequelize, Sequelize) {
  let modelo = sequelize.define(
    "Semilleros",{
      "idSemillero":{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
      },
      "nombreSemillero":{
        notEmpty:true,
        type:Sequelize.STRING
      },
      "descripcionSemillero":{
        notEmpty:true,
        type:Sequelize.STRING
      },
      "liderSemillero":{
        notEmpty:true,
        type:Sequelize.STRING
      }
    },
    {
      timestamps:false,
      freezeTableName:true
    }
  );
  return modelo;
};
module.exports = semillero;
