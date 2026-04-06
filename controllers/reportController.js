const Transaction = require("../models/Transaction");

exports.categorySummary = async (req, res) => {
  const summary = await Transaction.aggregate([
    { $match: { type: "expense" } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);

  res.json(summary);
};

exports.timeBasedReport = async (req, res) => {
  const { start, end } = req.query;

  const data = await Transaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      },
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  res.json(data);
};
