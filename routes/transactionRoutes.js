const express = require("express");
const {
  addTransaction,
  getTransactions,
  updateTransaction,
} = require("../controllers/transactionController");
const timeRestriction = require("../middleware/timeRestriction");

const router = express.Router();

router.post("/", addTransaction);
router.get("/", getTransactions);
router.put("/:id", timeRestriction, updateTransaction);

module.exports = router;
