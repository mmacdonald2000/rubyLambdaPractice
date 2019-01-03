// Node Lambda to call Ruby Lambda
var aws = require('aws-sdk');

module.exports.encryption = function (event, context, callback) {

  var emLicenseEncrypt = {
    id: 45,
    sn: 12345,
    host_id: '3a:00:a8:40:42:00',
    type: 'eM',
    start_date: new Date(),
    end_date: new Date(2022, 2, 5, 8),
    connections: 1,
  };

  var encryptPayload = { to_encrypt: emLicenseEncrypt };

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

}
