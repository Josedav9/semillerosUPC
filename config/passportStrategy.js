let bCrypt =require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
let passportStrategy = function(passport, usuario) {

  passport.serializeUser( (usuario, done)=>{
    done(null, usuario.idUsuario);
  });

  passport.deserializeUser( ( idUsuario, done )=>{
    usuarios.findBy( idUsuario ).then( (usuarioR)=>{
      if( usuarioR ){
        done(null, usuarioR.get())
      }else{
        done( usuarioR.errors, null )
      }
    });
  });

  passport.use( 'local-signup', new LocalStrategy(
    {
      userNameField: 'emailUsuario',
      passwordField: 'claveUsuario',
      passReqToCallback: true
    },
    (req, emailUsuario, claveUsuario, done)=>{
      let generateHash = ( claveUsuario )=>{
        return bCrypt.hashSync( claveUsuario, bCrypt.genSaltSync(8), null );
      }
      usuario.findOne( {
        "emailUsuario":emailUsuario
      }).then( (res)=>{
        if(res){
          return done( null, false, {message:"Este Email Ya Se Encuentra Registrado"} )
        }else{
          claveUsuario = generateHash( claveUsuario );
          let infoUsuario ={
            emailUsuario: emailUsuario,
            claveUsuario: claveUsuario
          };
          usuario.create( infoUsuario ).then(
            (nuevoUsuario, createUsuario)=>{
              if( !nuevoUsuario ){
                return done(null, false)
              }else{
                return done(null, nuevoUsuario)
              }
            }
          )
        }
      });
    }
  ));

};
module.exports = passportStrategy;
