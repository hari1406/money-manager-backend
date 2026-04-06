const Transaction = require("../models/Transaction");
const Account = require("../models/Account");

exports.addTransaction = async (req, res) => {
  const transaction = await Transaction.create(req.body);

  if (transaction.type !== "transfer") {
    const account = await Account.findById(transaction.account);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    if (transaction.type === "income") {
      account.balance += transaction.amount;
    } else {
      account.balance -= transaction.amount;
    }
    await account.save();
  }

  res.status(201).json(transaction);
};

exports.getTransactions = async (req, res) => {
  const { from, to, category, division } = req.query;

  let filter = {};
  if (from && to) {
    filter.createdAt = {
      $gte: new Date(from),
      $lte: new Date(to),
    };
  }
  if (category) filter.category = category;
  if (division) filter.division = division;

  const transactions = await Transaction.find(filter).sort({ createdAt: -1 });
  res.json(transactions);
};

exports.updateTransaction = async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};
