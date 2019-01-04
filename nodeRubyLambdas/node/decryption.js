// Node Lambda to call Ruby Lambda
const AWS = require('aws-sdk');
const Lambda = new AWS.Lambda({region: 'us-west-2'});


module.exports.decrypt = async (event, context) => {

  try {
    // an existing license (from David's test account) to test decryption
    const emLicenseDecrypt = 'ae/ci2iRkRubT0+k/GwzU2kr5+6b/2htcA0Ww5RMmlO9LqSqYTV+2mW+3C4ylwNb9Bv1oBdYCz3f8qRc9NWFsY2Fn8wNGQncW7Pq53MrihRufZT7LDAYsni5rfHQp1gV+a/23aa+My8SzmXXut3I28auewbAD8mbxYfTAd+hnFLFeRVnIkkGUIUoGUlJypBf6LJPwceBRsPBSM0ATaIJ8YvW2SXkP1SjkwQL2fHn6S8=';

    const params = {
      FunctionName: "nodeRubyLambdas-dev-rubyEncryption",
      InvocationType: "RequestResponse",
      LogType: "Tail",
      Payload: JSON.stringify({ to_decrypt: `${emLicenseDecrypt}` }),
    };

    console.log("Decrypting data");

    let decrypted = {};

    // Invoke the Ruby Lambda to decrypt some data
    await Lambda.invoke(params, (err, data) => {
      if(data) {
        console.log("Decrypt success");
        decrypted = data.Payload;
      }
    }).promise();
    // console.log("unencrypted: ", decrypted);

    return {
      statusCode: 200,
      body: JSON.parse(decrypted)
    };

  } catch (error) {
    console.error(error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    };
  }
}
