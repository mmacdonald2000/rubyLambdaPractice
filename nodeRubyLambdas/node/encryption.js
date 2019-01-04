// Node Lambda to call Ruby Lambda
const AWS = require('aws-sdk');
const Lambda = new AWS.Lambda({region: 'us-west-2'});

module.exports.encrypt = async (event, context) => {

  try {
    // a fake license object to test encryption
    const emLicenseEncrypt = {
      id: 45,
      sn: 12345,
      host_id: '3a:00:a8:40:42:00',
      type: 'eM',
      start_date: new Date(),
      end_date: new Date(2022, 2, 5, 8),
      connections: 1,
    };

    // params tell the invoke function which function to invoke, how to invoke it, how to display invocation logs, and what data to send
    const params = {
      FunctionName: "nodeRubyLambdas-dev-rubyEncryption",
      InvocationType: "RequestResponse",
      LogType: "Tail",
      Payload: JSON.stringify({ to_encrypt: emLicenseEncrypt }),
    };

    console.log("Encrypting data");

    // create variable to hold Ruby Lambda response
    let encrypted = {};

    // Invoke the Ruby Lambda, must use .promise() to use await here
    await Lambda.invoke(params, (err, data) => {
        if(data){
          console.log("Encrypt Success");
          encrypted = data.Payload
        }
    }).promise();
    // console.log(encrypted);

    // create return for this Lambda, encrypted has to be parsed because the return will automatically be stringified for us
    return {
      statusCode: 200,
      body: JSON.parse(encrypted)
    };

  } catch (error) {
    console.error(error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    };
  }

}
