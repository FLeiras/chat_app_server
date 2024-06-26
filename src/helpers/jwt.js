const jwt = require("jsonwebtoken");

const jwtGenerate = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          //? Error
          reject("No se creo el jwt");
        } else {
          //? Se manda el token
          resolve(token);
        }
      }
    );
  });
};

const jwtValidation = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);

    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = {
  jwtGenerate,
  jwtValidation
};
