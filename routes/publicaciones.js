const express = require('express');
const cors = require('cors');
let router =  express.Router();
//Accedo al modelo de mi base de datos
let models = require('../models/index');

router.get('/listaPublicaciones', (req,res)=>{
  models.Publicaciones.findAll().then(
    (lista)=>{
      res.json(lista);
    }
  ).catch(
    (error)=>{
      console.log(error);
      res.json(error);
    }
  );
});

router.post('/agregarPublicacion', (req,res)=>{
  let publicacion = {
    "fechaPublicacion": new Date(),
    "imagenPublicacion":"src",
    "tituloPublicacion":req.body.tituloPublicacion,
    "textoPublicacion":req.body.textoPublicacion,
    "idSemillero":req.body.idSemillero
  }
  models.Publicaciones.create(publicacion).then(
    (nuevaPublicacion, infoCreacion)=>{
      res.json(nuevaPublicacion);
    }
  ).catch(
    (error)=>{
      res.json(error);
    }
  )
});

router.get('/buscarPublicacion/:id', (req,res)=>{
  let id = req.params.id
  models.Publicaciones.find({
    where:{
      "idPublicacion":id
    }
  }).then(
    (publicacion)=> {
      res.json(publicacion);
    }
  ).catch(
    (error)=> {
      res.json(error)
    }
  )
});

router.get('/eliminarPublicacion/:id', (req,res)=>{
  let idPublicacion = req.params.id;
  models.Publicaciones.find(
      { where:{
          "idPublicacion":idPublicacion

          }
     }
  ).then(
        (publicacion) => {
          publicacion.destroy().then(
            ()=>{
              res.json({ 'msg':"Se elimino" })
            }
          );
        }
  ).catch(
    (error)=>{
      res.json(error)
    }
  )
});

router.post('/modificarPublicacion', (req,res)=>{
  let idPublicacion = req.body.idPublicacion;
  let publicacionInfo = {
    "fechaPublicacion": new Date(),
    "imagenPublicacion":"src",
    "tituloPublicacion":req.body.tituloPublicacion,
    "textoPublicacion":req.body.textoPublicacion,
    "idSemillero":req.body.idSemillero
  };
  models.Publicaciones.find(
      { where:{
          "idPublicacion":idPublicacion
        }
     }
  ).then(
        (publicacion) => {
          publicacion.updateAttributes(publicacionInfo).then(
            (publicacionN)=>{
              res.json( publicacionN )
            }
          );
        }
  ).catch(
    (error)=>{
      res.json(error)
    }
  )
})





module.exports = router;
