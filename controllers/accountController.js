const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

exports.createAccount = async (req, res) => {
  const account = await Account.create(req.body);
  res.status(201).json(account);
};

exports.getAccounts = async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
};

exports.transferAmount = async (req, res) => {
  const { fromAccount, toAccount, amount } = req.body;

  const from = await Account.findById(fromAccount);
  const to = await Account.findById(toAccount);

  if (from.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  from.balance -= amount;
  to.balance += amount;

  await from.save();
  await to.save();

  await Transaction.create({
    type: "transfer",
    amount,
    fromAccount,
    toAccount,
  });

  res.json({ message: "Transfer successful" });
};
