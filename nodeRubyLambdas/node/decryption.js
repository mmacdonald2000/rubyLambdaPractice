// Node Lambda to call Ruby Lambda
var aws = require('aws-sdk');

module.exports.main = function (event, context, callback) {

  var emLicenseDecrypt = 'ae/ci2iRkRubT0+k/GwzU2kr5+6b/2htcA0Ww5RMmlO9LqSqYTV+2mW+3C4ylwNb9Bv1oBdYCz3f8qRc9NWFsY2Fn8wNGQncW7Pq53MrihRufZT7LDAYsni5rfHQp1gV+a/23aa+My8SzmXXut3I28auewbAD8mbxYfTAd+hnFLFeRVnIkkGUIUoGUlJypBf6LJPwceBRsPBSM0ATaIJ8YvW2SXkP1SjkwQL2fHn6S8=';

  var decryptPayload = { to_decrypt: `${emLicenseDecrypt}` };


  var lambda = new aws.Lambda({
    region: 'us-west-2'
  })

  var params = {
    FunctionName: "nodeRubyLambdas-dev-rubyEncryption",
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify(decryptPayload),
  };

  // Invoke the Ruby Lambda to decrypt some data
  console.log("Decrypting data");


  var decrypted = lambda.invoke(params, function(err, data){
    if(err){
      console.log("decrypt failure");
      console.log(err,err.stack);
    } else {
      console.log("decrypt success");
      console.log(data);
      var unencrypted = JSON.parse(data.Payload);
      console.log("unencrypted: ", unencrypted);
      return unencrypted;
    }
  });

}
