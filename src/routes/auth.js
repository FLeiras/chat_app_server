//! Path: /api/login
const { Router } = require("express");
const { check } = require("express-validator");
const { userCreate, login, tokenRenew } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validation_fields");
const { jwtValidate } = require("../middlewares/token_validation");

const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es requerido").not().isEmpty(),
    check("email", "El email es requerido").not().isEmpty(),
    check("password", "La contraseña es requerida").not().isEmpty(),
    validateFields,
  ], userCreate);

router.post('/', [
  check("email", "El email es requerido").not().isEmpty(),
  check("password", "La contraseña es requerida").not().isEmpty(),
  validateFields,
], login);

router.get('/renew', jwtValidate ,tokenRenew);

module.exports = router;
