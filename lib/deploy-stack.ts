import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as elasticbeanstalk from 'aws-cdk-lib/aws-elasticbeanstalk';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { elasticBeanstalkConfig } from './eb-config';
import { S3BucketResource } from './resources/s3';
import { ElasticBeanstalkResource } from './resources/ElasticBeanstalk';
import { IAMResource } from './resources/IAM';
import * as dotenv from 'dotenv';

dotenv.config(); 



// 🔹 Function to create Lambda Functions
const createSchemaCreatorLambda = (scope: Construct, id: string) => {
    return new nodejs.NodejsFunction(scope, id, {
        functionName: `${id}`,
        runtime: lambda.Runtime.NODEJS_20_X,
        handler: 'handler',
        entry: 'lib/lambda/schema_creator.ts',
        environment: {
            DB_HOST: process.env.DB_HOST!,
            DB_DATABASE: process.env.DB_DATABASE!,
            DB_USER: process.env.DB_USER!,
            DB_PASSWORD: process.env.DB_PASSWORD!,
            DB_PORT: process.env.DB_PORT || '5432',
            DB_SCHEMA: process.env.DB_SCHEMA!
        }
    });
};

// 🔹 Function to create CloudFront Distribution
const createCloudFront = (scope: Construct, id: string, endpointUrl: string) => {
    return new cloudfront.Distribution(scope, id, {
        defaultBehavior: {
            origin: new origins.HttpOrigin(endpointUrl),
            cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        }
    });
};

// 🔹 Main Stack Definition
export class KaitoApplicationStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Initialize Resources
        const s3Bucket = new S3BucketResource(this);
        const beanstalk = new ElasticBeanstalkResource(this);
        const iam = new IAMResource(this);

        // S3 Buckets
        const myBucket = s3Bucket.create('MyBucket1', `${process.env.APP_NAME}-${process.env.NODE_ENV}-client1`.toLowerCase());

        // Create Elastic Beanstalk App & Env
        const ebApp1 = beanstalk.createApplication('MyElasticBeanstalkApp1', "kaito-eb-app-1");
        const instanceProfile1 = iam.createInstanceRole('MyBeanstalkInstanceRole1');
        const ebEnv1 = beanstalk.createEnvironment('MyElasticBeanstalkEnv1', ebApp1.applicationName!, instanceProfile1.ref);

        // Lambda Functions
        const schemaCreatorLambda1 = createSchemaCreatorLambda(this, 'SchemaCreatorLambda1');

        // Outputs
        new cdk.CfnOutput(this, 'BucketName', { value: myBucket.bucketName });
        new cdk.CfnOutput(this, 'ElasticBeanstalkEnv1', { value: ebEnv1.ref });
        new cdk.CfnOutput(this, 'Lambda1', { value: schemaCreatorLambda1.functionName });
    }
}
