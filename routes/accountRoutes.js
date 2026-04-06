const express = require("express");
const {
  createAccount,
  getAccounts,
  transferAmount,
} = require("../controllers/accountController");

const router = express.Router();

router.post("/", createAccount);
router.get("/", getAccounts);
router.post("/transfer", transferAmount);

module.exports = router;
