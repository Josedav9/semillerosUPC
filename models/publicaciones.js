let publicacion = function(sequelize, Sequelize) {
  let modelo = sequelize.define(
    "Publicaciones",{
      "idPublicacion":{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
      },
      "fechaPublicacion":{
        notEmpty:true,
        type:Sequelize.DATE
      },
      "imagenPublicacion":{
        notEmpty:true,
        type:Sequelize.STRING
      },
      "tituloPublicacion":{
        notEmpty:true,
        type:Sequelize.STRING
      },
      "textoPublicacion":{
        notEmpty:true,
        type:Sequelize.STRING
      },
      "idSemillero":{
        type: Sequelize.INTEGER,
        notEmpty:true,
        references:{
          model:"Semilleros",
          key:'idSemillero',
          deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
    },
    {
      timestamps:false,
      freezeTableName:true
    }
  );
  return modelo;
};
module.exports = publicacion;
