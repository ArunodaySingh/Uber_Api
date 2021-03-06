const validator = require("../src/utils/validator");
const jwt = require("../src/utils/jwt");
const systemConfig = require("../src/configs/system");
const userModel = require("../src/models/Booking");

const booking_controller = async function (req, res) {
  try {
    console.log("hey")
    const requestBody = req.body;
    if (!validator.isValidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide user details",
      });
      return;
    }

    //Extract prams
    const { bookingId, driverId, riderId, driverCurrentLocation,riderCurrentLocation,destinationLocationOfRider,riderLocationArrivedTime,bookingTime,startRideTime,endRideTime,waitingTime,sharedRideLink,paymentId,cancelled,driverFeedback,userFeedback,offer } = requestBody;

    // Validation starts
    if (!validator.isValid(bookingId)) {
      res
        .status(400)
        .send({ status: false, message: "bookingId is required" });
      return;
    }

    if (!validator.isValid(driverId)) {
      res
        .status(400)
        .send({ status: false, message: "driverId  is required" });
      return;
    }

    if (!validator.isValid(riderId)) {
      res
        .status(400)
        .send({ status: false, message: "riderId Number is required" });
      return;
    }

    if (!validator.isValid(driverCurrentLocation)) {
      res
        .status(400)
        .send({ status: false, message: "driverCurrentLocation  is Necessary" });
      return;
    }


    if (!validator.isValid(riderCurrentLocation)) {
        res
          .status(400)
          .send({ status: false, message: "riderCurrentLocation  is required" });
        return;
      }

      if (!validator.isValid(riderLocationArrivedTime)) {
        res
          .status(400)
          .send({ status: false, message: "riderLocationArrivedTime  is required" });
        return;
      }  
      
    
      if (!validator.isValid(destinationLocationOfRider)) {
        res
          .status(400)
          .send({ status: false, message: "destinationLocationOfRiderr is required" });
        return;
      }

     
    if (!validator.isValid(bookingTime)) {
        res
          .status(400)
          .send({ status: false, message: "bookingTime is Necessary" });
        return;
      } 

    if (!validator.isValid(startRideTime)) {
        res
          .status(400)
          .send({ status: false, message: "startRideTime  is Necessary" });
        return;
    }  

    if (!validator.isValid(endRideTime)) {
        res
          .status(400)
          .send({ status: false, message: "endRideTime  is Necessary" });
        return;
    }  

    if (!validator.isValid(waitingTime)) {
        res
          .status(400)
          .send({ status: false, message: "waitingTime  is Necessary" });
        return;
    }  

    if (!validator.isValid(sharedRideLink)) {
        res
          .status(400)
          .send({ status: false, message: "sharedRideLink  is Necessary" });
        return;
    }  

    if (!validator.isValid(paymentId)) {
        res
          .status(400)
          .send({ status: false, message: "paymentId  is Necessary" });
        return;
    }  

    if (!validator.isValid(cancelled)) {
        res
          .status(400)
          .send({ status: false, message: "Ride cancelled info is Necessary" });
        return;
    } 

    if (!validator.isValid(driverFeedback)) {
        res
          .status(400)
          .send({ status: false, message: "driverFeedback  is Necessary" });
        return;
    } 

    if (!validator.isValid(userFeedback)) {
        res
          .status(400)
          .send({ status: false, message: "userFeedback  is Necessary" });
        return;
    } 

    if (!validator.isValid(offer)) {
        res
          .status(400)
          .send({ status: false, message: "offer information  is Necessary" });
        return;
    } 

// Validation ends
const booking_cab = {bookingId, driverId, riderId, driverCurrentLocation,riderCurrentLocation,destinationLocationOfRider,riderLocationArrivedTime,bookingTime,startRideTime,endRideTime,waitingTime,sharedRideLink,paymentId,cancelled,driverFeedback,userFeedback,offer};
const bookcab_data = await userModel.create(booking_cab);

res.status(201).send({ status: true, message: "Success", data: bookcab_data });

  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getbookingdetails = async function (req, res) {
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
  booking_controller,
  getbookingdetails

}
