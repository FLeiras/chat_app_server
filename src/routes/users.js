//! Path: /api/users
const { Router } = require("express");

const { getUsers } = require("../controllers/users");
const { jwtValidate } = require("../middlewares/token_validation");

const router = Router();

router.get('/all', jwtValidate ,getUsers);

module.exports = router;
