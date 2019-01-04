// These were the original encryption.js and decryption.js. They use design pattern from Node 6.10 (callback instead of async) and have since been updated both to use Node 8.10 design patterns and ES6 syntax.

// Node Lambda to call Ruby Lambda for encryption
const AWS = require('aws-sdk');
const Lambda = new AWS.Lambda({region: 'us-west-2'})

module.exports.encrypt = (event, context, callback) => {

  const emLicenseEncrypt = {
    id: 45,
    sn: 12345,
    host_id: '3a:00:a8:40:42:00',
    type: 'eM',
    start_date: new Date(),
    end_date: new Date(2022, 2, 5, 8),
    connections: 1,
  };

  const params = {
    FunctionName: "nodeRubyLambdas-dev-rubyEncryption",
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify({ to_encrypt: emLicenseEncrypt }),
  };


  // Invoke the Ruby Lambda to encrypt some data
  console.log("Encrypting data");

  Lambda.invoke(params, function(err, data){
    if (err) {
      console.log("Encrypt Failure");
      console.log(err, err.stack);
      callback(err);
    } else {
      console.log("Encrypt Success");
      var encrypted = data.Payload
      console.log(encrypted);
      // callback automatically stringifies output so must parse the data
      callback(null, JSON.parse(encrypted))
    }
  });

}

// Node Lambda to call Ruby Lambda for decryption
var aws = require('aws-sdk');

module.exports.decrypt = function (event, context, callback) {

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
      callback(err);
    } else {
      console.log("decrypt success");
      console.log(data);
      var unencrypted = JSON.parse(data.Payload);
      console.log("unencrypted: ", unencrypted);
      callback(null, JSON.parse(unencrypted))
    }
  });

}
