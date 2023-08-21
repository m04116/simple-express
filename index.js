const express = require("express");
const app = express();
const port = 3050;

// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const getCredentials = async () => {
  const secret_name = "ttt";

  const client = new SecretsManagerClient({
    region: "us-east-1",
  });

  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      }),
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  const secret = response.SecretString;
  console.log("--secret--", secret);
};

getCredentials();

// Your code goes here

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// console.log('----', process.env)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
