//use here booking model after testing
const userModel = require("../src/models/DriverModel");

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


module.exports = getbookingdetails;
