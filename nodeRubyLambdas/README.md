# nodeRubyLambdas
Node Lambda executes Ruby Lambda when triggered, uses Serverless Node.js Starter; see documentation below.

## node/handler.js
Node Lambda triggers ruby/rubyRijndaelEncryption.rb twice.    
1) Passes a license to encrypt, logs will contain print of json object with encrypted license string.   
2) Passes an existing license to decrypt, logs will contain print of json object with decrypted license object.  This object will be returned from the lambda.    

### input
Only standard event and context needed. No specific values are needed to trigger the function.

### output
Json from Ruby Lambda of encrypted license OR  
Json from Ruby Lambda of decrypted license   

## /ruby/RijndaelEncryption.rb

### input
Json object with either "to_encrypt" or "to_decrypt" key

### output
"to_encrypt" key given: return Json object w/ encrypted license stored in "encrypted" key  
"to_decrypt" key given: return Json object w/ decrypted license stored in "decrypted" key

## /node/encryption.js
node/handler.js was split into 2 additional Lambdas to test deployment package size.  This one triggers the Ruby Lambda to encrypt a license.

### input
Only standard event and context needed.

### output
Json from Ruby Lambda of encrypted license

## /node/decryption.js
node/handler.js was split into 2 additional Lambdas to test deployment package size.  This one triggers the Ruby Lambda to decrypt an existing license.

### input
Only standard event and context needed.

### output
Json from Ruby Lambda of decrypted license

#### deployment
As of 12/27/18, use
``` bash
$ serverless deploy
```
Ruby dependencies will automatically be bundled before deploying.



## Serverless Node.js Starter

This project used a Node.js template from Serverless Framework.

### Requirements

- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Installation

To create a new Serverless project.

``` bash
$ serverless install --url https://github.com/AnomalyInnovations/serverless-nodejs-starter --name my-project
```

Enter the new directory

``` bash
$ cd my-project
```

Install the Node.js packages

``` bash
$ npm install
```

### Usage

Deploy your project

``` bash
$ serverless deploy
```

Deploy a single function

``` bash
$ serverless deploy function --function hello
```


### Maintainers

Serverless Node.js Starter is maintained by Frank Wang ([@fanjiewang](https://twitter.com/fanjiewang)) & Jay V ([@jayair](https://twitter.com/jayair)). [**Subscribe to our newsletter**](http://eepurl.com/cEaBlf) for updates. Send us an [email](mailto:contact@anoma.ly) if you have any questions.
