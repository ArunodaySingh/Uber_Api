const validator = require("../src/utils/validator");
const jwt = require("../src/utils/jwt");
const systemConfig = require("../src/configs/system");
const userModel = require("../src/models/UserModel");

const Offer_Controller = async function (req, res) {
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
    const { offerId, startDate, endDate, noOfTimesUsed } = requestBody;

    // Validation starts
    if (!validator.isValid(offerId)) {
      res
        .status(400)
        .send({ status: false, message: "offerId is required" });
      return;
    }

    if (!validator.isValid(startDate)) {
      res
        .status(400)
        .send({ status: false, message: "startDate is required" });
      return;
    }

    if (!validator.isValid(endDate)) {
      res
        .status(400)
        .send({ status: false, message: "endDate  is required" });
      return;
    }

    if (!validator.isValid(noOfTimesUsed)) {
        res
          .status(400)
          .send({ status: false, message: "noOfTimesUsed  is required" });
        return;
      }

   

// Validation ends
const Offer_info = {listOfCheckBox, Rating, feedBack};
const Offer_data = await userModel.create(Offer_info);

res.status(201).send({ status: true, message: "Success", data: Offer_data });

  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const OfferbyID_Controller = async function (req, res) {
  try{
    
    let a=req.params.id;
    userModel.findOne({_id:a},function(err,result){
      if(!err){
        res.send(result);
      }
})
  }
  catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
 
}

module.exports = {
  Offer_Controller,
OfferbyID_Controller
}
