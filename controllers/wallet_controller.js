const validator = require("../src/utils/validator");
const Wallet = require("../src/models/Wallet");

const Wallet_Controller = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!validator.isValidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide user details",
      });
      return;
    }

    //Extract prams
    const { walletId, basePercentage, walletAmount, isBlocked } = requestBody;

    // Validation starts
    if (!validator.isValid(walletId)) {
      res.status(400).send({ status: false, message: "walletId is required" });
      return;
    }

    if (!validator.isValid(walletAmount)) {
      res
        .status(400)
        .send({ status: false, message: "walletAmount is required" });
      return;
    }

    if (!validator.isValid(isBlocked)) {
      res
        .status(400)
        .send({ status: false, message: "isBlocked info is required" });
      return;
    }

    if (!validator.isValid(basePercentage)) {
      res
        .status(400)
        .send({ status: false, message: "basePercentage is required" });
      return;
    }

    // Validation ends
    const wallet_info = { walletId, basePercentage, walletAmount, isBlocked };
    const wallet_data = await Wallet.create(wallet_info);

    res
      .status(201)
      .send({ status: true, message: "Success", data: wallet_data });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getwalletdetails = async function (req, res) {
  try {

    Wallet.find({ }, function (err, result) {
      if (!err) {
        console.log(result)
        res.send(result);
      }
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const updateWalletDetails = async function (req, res) {
  try {
    const walletId = req.params.id;
    const requestBody = req.body;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message:
          "Invalid request parameters. Please provide valid wallet details",
      });
    }

    const newWalletData = { ...requestBody };
    const newWallet = await Wallet.findByIdAndUpdate(walletId, newWalletData, {
      new: true,
    });

    res.status(200).send({ status: true, message: "Success", data: newWallet });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  Wallet_Controller,
  getwalletdetails,
  updateWalletDetails,
};
