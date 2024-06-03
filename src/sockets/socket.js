const { io } = require("../../index");
const { jwtValidation } = require("../helpers/jwt");

const {
  userConnect,
  userDisconnect,
  saveMessage,
} = require("../controllers/socket");

//* Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  const [valid, uid] = jwtValidation(client.handshake.headers["x-token"]);

  // Verifico si esta autenticado
  if (!valid) {
    return client.disconnect();
  }

  // Cliente autenticado
  userConnect(uid);

  // Ingresar al usuario a una sala espesifica
  client.join(uid);

  client.on("personal-message", async (payload) => {
    console.log(payload);
    const resp = await saveMessage(payload);

    io.to(payload.for).emit("personal-message", payload);
  });

  client.on("disconnect", () => {
    userDisconnect(uid);
  });

  // client.on('mensaje', ( payload ) => {
  //     console.log('Mensaje', payload);
  //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
  // });
});
