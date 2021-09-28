const bcrypt = require("bcryptjs");
// const { isEmpty } = require("lodash");
const Query = require("../../database/query");



class Controller {

  // signup
  async signUp(req, res) {
    let { name, email, password, confirmPassword } = req.body;
    email = email.toLowerCase();
    if(password != confirmPassword){
        res.status(400).send({
            success: false,
            error: "Confirm Password Does Not Match!!",
        });
    }
    password = await bcrypt.hash(password, 8);
    console.log(`....................req.body`, req.body)
    // Check if email already exist or not!!
    const matchQuery = 
      `SELECT * from userAuth WHERE email='${email}'`;
    const emailAlreadyExist = await Query.get(matchQuery, res);
    console.log(`....................emailAlreadyExist`, emailAlreadyExist)

    if(!emailAlreadyExist.isFound) {
      const sqlQuery =
      `insert into userAuth (name,email,password)` +
      ` values ('${name}','${email}','${password}')`;
      const userData = await Query.post(sqlQuery, res);
      console.log(`....................userData`, userData)
      res.send({
        response: userData,
        message: "You are registered successfully!!",
       });
    }
    else {
        res.status(400).send({
          success: false,
          error: "An account with this email already exist.",
      });
    }
  } 

  // login
  async login(req, res) {
    // console.log("====req.body====");
    // // console.log("====req.body====", req);
    // console.log("====req.body====", req.body);
    let { email, password } = req.body;
    const matchQuery = "SELECT * from userAuth where email='" + email + "'";
    const data = await Query.get(matchQuery, res);
    let status = {};
    console.log(`.>.>>>>>>>>>>>>>>>>data`, data)
    console.log(`.>.>>>>>>>>>>>>>>>>password`, password)
    const userData = data.data[0]
    if (!data.isFound) {
      status = {
        message: "No User Found.",
        matched: false,
        userInfo: null,
      }
      return res.status(400).send({ error: status.message });
    } 
    else {
      if (await bcrypt.compare(password, userData.password)){
        return res.send({ message: "Login Successful!!"});
      }else{
        return res.send({message: "Invalid Credentials!!"})
      }
      
    }
  }
}

module.exports = new Controller();
