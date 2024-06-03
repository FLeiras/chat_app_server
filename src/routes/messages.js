//! Path: /api/messages
const { Router } = require("express");

const { getChat } = require("../controllers/messages");
const { jwtValidate } = require("../middlewares/token_validation");

const router = Router();

router.get('/:of', jwtValidate, getChat);

module.exports = router;

