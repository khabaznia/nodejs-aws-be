import type { AWS } from '@serverless/typescript';

import getProductList from "@functions/getProductList";
import getProductById from "@functions/getProductById";
const swaggerUi = require('aws-serverless-swagger-ui');
const swaggerHandler = swaggerUi.setup('swagger.yaml');

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "us-east-1",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { getProductList, getProductById }
};

exports.handler = async (event, context, callback) => {
  return (await swaggerHandler)(event, context, callback);
}
module.exports = serverlessConfiguration;
