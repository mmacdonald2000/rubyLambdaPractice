# rubyLambdaPractice
practice writing AWS Lambda Function with Ruby

## emLicenseLambda
Lambda executes Rijndael encryption from crypt19-rb module.
### input
Json object w/ "to_encrypt" and "em_license" keys
### output
string (logs will contain print statements of license decryption)

### to deploy
Create function file w/ Gemfile  
$ bundle install $  
$ bundle install --deployment $  
Create a template.yaml file    
$ sam package --template-file template.yaml \   
 --output-template-file packaged-template.yaml \  
--s3-bucket <YOUR S3 BUCKET NAME> \  $
then  
$ sam deploy --template-file packaged-template.yaml \  
 --stack-name <STACK NAME> \  
 --capabilities CAPABILITY_IAM $   

## eaiLicenseLambda
This is unnecessary since we have solved decryption with Node.js
