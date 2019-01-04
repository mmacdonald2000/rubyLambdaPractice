// invoking another lambda with async/await
const AWS = require('aws-sdk')
const Lambda = new AWS.Lambda()

async function invokeLambda(functionName) {
  const req = {
    FunctionName: functionName,
    Payload: JSON.stringify({ message: 'hello world' })
  }
  await Lambda.invoke(req).promise()
}

// using promises w/ .then()
module.exports.login = (event, context) => {
  return connectToDatabase() // returning promise! :)
    .then(() =>
      login(JSON.parse(event.body)) // promise
    )
    .then(session => ({ // resolving the promise to an object
      statusCode: 200,
      body: JSON.stringify(session)
    }))
    .catch(err => ({ // or rejecting with an error
      statusCode: 500,
      body: JSON.stringify(err)
    }));
};

// using promises with async/await
module.exports.login = async (event, context) => { // Lambda is async!
  try {
    const db = await connectToDatabase();
    const session = await login(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify(session)
    };
  } catch (error) {
    console.error(error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    };
  }
};
