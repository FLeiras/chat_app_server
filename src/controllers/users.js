const { response } = require("express");
const User = require('../models/user');

const getUsers = async (req, res = response) => {
  try {

    const init = Number( req.query.init ) || 0;


    const users = await User
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(init)
        .limit(20);

    res.json({
        ok: true,
        users,
    });

  } catch (error) {
    console.log(error);
    throw new Error("Falló algo en el pedido de la información");
  }
};

module.exports = {
  getUsers,
};
