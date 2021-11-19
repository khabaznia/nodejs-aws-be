import type { AWS } from '@serverless/typescript'

import getProductList from './src/functions/getProductList'
import getProductById from './src/functions/getProductById'
import createProduct from './src/functions/createProduct'

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PG_USER: '${env:PG_USER}',
      PG_HOST: '${env:PG_HOST}',
      PG_PASSWORD: '${env:PG_PASSWORD}',
      PG_DATABASE: '${env:PG_DATABASE}',
      PG_PORT: '${env:PG_PORT}',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { getProductList, getProductById, createProduct }
}

module.exports = serverlessConfiguration
