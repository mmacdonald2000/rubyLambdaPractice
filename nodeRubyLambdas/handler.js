// Node Lambda to call Ruby Lambda


export async function main(event, context, callback) {
  // to access event variables:
  // event.variable_name

  const emLicenseEncrypt = {
    id: 45,
    sn: 12345,
    host_id: '3a:00:a8:40:42:00',
    type: 'eM',
    start_date: new Date(),
    end_date: new Date(2022, 2, 5, 8),
    connections: 1,
  };

  const emLicenseDecrypt = 'tcL+msWBGLQzCa6dkA63aU2VH86MKWZQ9i8rwY3XdHMHBPeSPjdJ2BmGSyu7JaUaX9OZb7YNxcQaF5eOouoLH/RNRfbw/OK7Bao1RjcqmkXDvjNzN+msrVmOBudMas2/ZB8TvxTjHf29S4r7wvXqROl4gqFSIzNSHKOIrBYmNFrRASM4Ei80cMrpIdrq3UXsFphqEC2iktISGBhgs3Xr7ujGpYoGDub+1UTE6Vg0BDI= ';

  const encryptPayload = { 'to_encrypt': emLicenseEncrypt };
  const decryptPayload = { 'to_decrypt': emLicenseDecrypt };

  const aws = require('aws-sdk');

  const lambda = new aws.Lambda({
    region: 'us-west-2'
  })

  let params = {
    FunctionName: "rubyEncryption",
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify(encryptPayload),
  };

  // console.log(params.Payload);

  console.log("Encrypting data");

  lambda.invoke(params, function(err, data){
    if (err) {
      console.log("encrypt failure");
      console.log(err, err.stack);
    } else {
      console.log("encrypt success");
      console.log(data);
    }
  });

  params.Payload = JSON.stringify(decryptPayload);

  // console.log(params.Payload);

  let unencrypted = '';
  console.log("Decrypting data");

  lambda.invoke(params, function(err, data){
    if(err){
      console.log("decrypt failure");
      console.log(err,err.stack);
    } else {
      console.log("decrypt success");
      console.log(data);
      unencrypted = data;
    }
  });

  return unencrypted;

}
