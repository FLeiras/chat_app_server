// path: api/login
const { Router } = require("express");
const { check } = require("express-validator");
const { userCreate, login, tokenRenew } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validation_fields");
const { jwtValidate } = require("../middlewares/token_validation");

const router = Router();

router.post(
  "/new",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").not().isEmpty(),
    check("password", "The password is required").not().isEmpty(),
    validateFields,
  ], userCreate);

router.post('/', [
  check("email", "The email is required").not().isEmpty(),
  check("password", "The password is required").not().isEmpty(),
  validateFields,
], login);

router.get('/renew', jwtValidate ,tokenRenew);

module.exports = router;
