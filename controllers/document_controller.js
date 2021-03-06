const validator = require("../src/utils/validator");
const jwt = require("../src/utils/jwt");
const systemConfig = require("../src/configs/system");
const userModel = require("../src/models/Document");
const Document = require("../src/models/Document");

const is_docvalid = async function (req, res) {
  try {
    console.log("hry");
    const requestBody = req.body;
    if (!validator.isValidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide user details",
      });
      return;
    }

    //Extract prams
    const { adhaar, PAN, drivingLicence, addressProof } = requestBody;

    // Validation starts
    if (!validator.isValid(adhaar)) {
      res
        .status(400)
        .send({ status: false, message: "Adhaar Number is required" });
      return;
    }

    if (!validator.isValid(PAN)) {
      res
        .status(400)
        .send({ status: false, message: "PAN Number is required" });
      return;
    }

    if (!validator.isValid(drivingLicence)) {
      res
        .status(400)
        .send({ status: false, message: "drivingLicence Number is required" });
      return;
    }

    if (!validator.isValid(addressProof)) {
      res
        .status(400)
        .send({ status: false, message: "AddressProof  is Necessary" });
      return;
    }

    // Validation ends
    const doc_proof = { adhaar, PAN, drivingLicence, addressProof };
    const valid_Doc = await userModel.create(doc_proof);

    res.status(201).send({ status: true, message: "Success", data: valid_Doc });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getdocumentdetails = async function (req, res) {
  try {
    let a = req.params.id;
    userModel.findOne({ _id: a }, function (err, result) {
      if (!err) {
        res.send(result);
      }
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const updateDocumentDetails = async (req, res) => {
  try {
    const documentId = req.params.id;
    const requestBody = req.body;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message:
          "Invalid request parameters. Please provide valid document details",
      });
    }

    const newDocumentData = { ...requestBody };
    const newDocument = await Document.findByIdAndUpdate(
      documentId,
      newDocumentData,
      {
        new: true,
      }
    );

    res
      .status(200)
      .send({ status: true, message: "Success", data: newDocument });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  is_docvalid,
  getdocumentdetails,
  updateDocumentDetails,
};
