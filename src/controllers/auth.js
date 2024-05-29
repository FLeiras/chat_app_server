const bcrypt = require('bcryptjs');
const { response } = require("express");

const User = require("../models/user");
const { jwtGenerate } = require('../helpers/jwt');

const userCreate = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExist = await User.findOne({ email });

    if( emailExist ) {
        return res.status(400).json({
            ok: false,
            msg: 'This email exist'
        })
    }

    const user = new User(req.body);

    //* Ecripto la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    user.save();

    //* Genero JWT
    const token = await jwtGenerate( user.id );

    res.json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
};

const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    const userDb = await User.findOne({ email });
    if ( !userDb ){
      return res.status(404).json({
        ok:false,
        msg: 'Falta un campo obligario'
      });
    };

    //* Válidar el password
    const validPass = bcrypt.compareSync( password, userDb.password );
    if( !validPass ){
      return res.status(404).json({
        ok:false,
        msg: 'Uno de los campos no es válido'
      });
    };

    //* Generar el JWT
    const token = await jwtGenerate( userDb.id );
    
    res.json({
      ok: true,
      user: userDb,
      token
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Falló el login'
    })
  }
};

const tokenRenew = async ( req, res = response ) => {

  const uid  = req.uid;

  const newJwt = await jwtGenerate( uid );

  const userMatchInDb = User.findById(uid);

  res.json({
    ok: true,
    user: userMatchInDb,
    newJwt
  });

};

module.exports = {
  userCreate,
  login,
  tokenRenew
};
