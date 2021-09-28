const mySql = require("./connection")


const handleError = (error, res) => {
    console.log("query error", error);
    return res.status(400).send({
      statusCode: 400,
      message: "Something went wrong!! Please try again.",
      data: error,
    });
  };
  
  class Query {
    async post(query, res) {
      return await new Promise((resolve, reject) => {
        mySql.query(query, async (err, data) => {
          if (err) {
            reject(handleError(err, res));
          } else {
            resolve({
              statusCode: 201,
              message: "Data saved successfully!",
              data,
              isRegistered: true,
            });
          }
        });
      });
    }
  
  
    async get(query, res) {
      return await new Promise((resolve, reject) => {
        mySql.query(query, async (err, data) => {
          if (err) {
            reject(handleError(err, res));
          } else {
            resolve({
              statusCode: 201,
              message: "Record found successfully.",
              data,
              isFound: data.length,
            });
          }
        });
      });
    }
  
}

module.exports = new Query();
