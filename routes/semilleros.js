const express = require('express');
let router =  express.Router();
//Accedo al modelo de mi base de datos
let models = require('../models/index');

router.get('/listaSemilleros', (req,res)=>{
  models.Semilleros.findAll().then(
        (lista)=>{
            res.json(lista);
        }).catch(
          (error)=>{
            res.json(error);
          }
        );
});

router.post('/crearSemillero',(req,res)=>{
  let infoSemillero = {
    "nombreSemillero":req.body.nombreSemillero,
    "descripcionSemillero":req.body.descripcionSemillero,
    "liderSemillero":req.body.liderSemillero
  };
  models.Semilleros.create(infoSemillero).then(
        (nuevoSemillero, infoCreacion)=>{
          res.json(nuevoSemillero);
        }
      ).catch(
        (error)=>{
          res.json(error);
        }
      );
});

router.get('/buscarSemillero/:id', (req,res)=>{
  let idSemillero = req.params.id;
  models.Semilleros.find(
      { where:{
          "idSemillero":idSemillero
                }
     }
  ).then(
        (semillero) => {
          res.json(semillero);
        }
  ).catch(
    (error)=>{
      res.json(error)
    }
  )
});

router.get('/eliminarSemillero/:id', (req,res)=>{
  let idSemillero = req.params.id;
  models.Semilleros.find(
      { where:{
          "idSemillero":idSemillero
                }
     }
  ).then(
        (semillero) => {
          semillero.destroy().then(
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

router.post('/modificarSemillero', (req,res)=>{
  let idSemillero = req.body.idSemillero;
  let infoSemillero = {
    "nombreSemillero":req.body.nombreSemillero,
    "descripcionSemillero":req.body.descripcionSemillero,
    "liderSemillero":req.body.liderSemillero
  };
  models.Semilleros.find(
      { where:{
          "idSemillero":idSemillero
                }
     }
  ).then(
        (semillero) => {
          semillero.updateAttributes(infoSemillero).then(
            (semillero)=>{
              res.json( semillero )
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
