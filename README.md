# rubyLambdaPractice
practice writing AWS Lambda Functions with Ruby

## emLicenseLambda
Lambda executes Rijndael encryption from crypt19-rb module.

### input
Json object w/ "to_encrypt" and "em_license" keys
### output
string (logs will contain print statements of license decryption)

### to deploy
The following describes a method of packaged the dependencies with the Lambda.  
Create function file w/ Gemfile  
 ` bundle install `   
 ` bundle install --deployment `   
Create a template.yaml file    
` sam package --template-file template.yaml \ `    
` --output-template-file packaged-template.yaml \ `   
` --s3-bucket <YOUR S3 BUCKET NAME> \ `   
then  
` sam deploy --template-file packaged-template.yaml \ `   
` --stack-name <STACK NAME> \ `   
` --capabilities CAPABILITY_IAM `     

## eaiLicenseLambda
This is unnecessary since we have solved decryption with Node.js

## nodeRubyLambdas / ruby
Node Lambda should execute Ruby Lambda when triggered.

### handler.js
Node Lambda triggers ruby/rubyRijndaelEncryption.rb twice.    
1) Passes a license to encrypt, logs will contain print of json object with encrypted license string.   
2) Passes an existing license to decrypt, logs will contain print of json object with decrypted license object.  This object will be returned from the lambda.    

#### input
Only standard event and context needed.

#### output
Json from Ruby Lambda of unencrypted license


### /ruby was removed from /nodeRubyLambdas as webpack kept breaking on the .rb files
I decided to separate the two lambdas in the interest of figuring out how to trigger the one from the other instead of troubleshooting webpack right away.

### /ruby/RijndaelEncryption.rb

#### input
Json object with either "to_encrypt" or "to_decrypt" key

#### output
"to_encrypt" key given: return Json object w/ encrypted license stored in "encrypted" key  
"to_decrypt" key given: return Json object w/ decrypted license stored in "decrypted" key
