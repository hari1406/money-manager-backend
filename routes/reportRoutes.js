const express = require("express");
const {
  categorySummary,
  timeBasedReport,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/category-summary", categorySummary);
router.get("/time-report", timeBasedReport);

module.exports = router;
