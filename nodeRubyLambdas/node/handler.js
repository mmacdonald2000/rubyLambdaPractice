// Node Lambda to call Ruby Lambda
var aws = require('aws-sdk');

export function main(event, context, callback) {
  // to access event variables:
  // event.variable_name

  var emLicenseEncrypt = {
    id: 45,
    sn: 12345,
    host_id: '3a:00:a8:40:42:00',
    type: 'eM',
    start_date: new Date(),
    end_date: new Date(2022, 2, 5, 8),
    connections: 1,
  };

  var emLicenseDecrypt = 'ae/ci2iRkRubT0+k/GwzU2kr5+6b/2htcA0Ww5RMmlO9LqSqYTV+2mW+3C4ylwNb9Bv1oBdYCz3f8qRc9NWFsY2Fn8wNGQncW7Pq53MrihRufZT7LDAYsni5rfHQp1gV+a/23aa+My8SzmXXut3I28auewbAD8mbxYfTAd+hnFLFeRVnIkkGUIUoGUlJypBf6LJPwceBRsPBSM0ATaIJ8YvW2SXkP1SjkwQL2fHn6S8=';

  var encryptPayload = { to_encrypt: emLicenseEncrypt };
  var decryptPayload = { to_decrypt: `${emLicenseDecrypt}` };


  var lambda = new aws.Lambda({
    region: 'us-west-2'
  })

  var params = {
    FunctionName: "nodeRubyLambdas-dev-rubyEncryption",
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify(encryptPayload),
  };

  // Invoke the Ruby Lambda to encrypt some data
  console.log("Encrypting data");

  var encrypted = lambda.invoke(params, function(err, data){
    if (err) {
      console.log("Encrypt Failure");
      console.log(err, err.stack);
    } else {
      console.log("Encrypt Success");
      var encrypted = JSON.parse(data.Payload)
      console.log(encrypted);
      return encrypted;
    }
  });

  // // To see decryption: uncomment this section and comment out Lines 36 - 48
  //
  // // Invoke the Ruby Lambda to decrypt some data
  // console.log("Decrypting data");
  //
  // params.Payload = JSON.stringify(decryptPayload);
  //
  // var decrypted = lambda.invoke(params, function(err, data){
  //   if(err){
  //     console.log("decrypt failure");
  //     console.log(err,err.stack);
  //   } else {
  //     console.log("decrypt success");
  //     console.log(data);
  //     var unencrypted = JSON.parse(data.Payload);
  //     console.log("unencrypted: ", unencrypted);
  //     return unencrypted;
  //   }
  // });

}
