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

// 🔹 Main Stack Definition
export class KaitoApplicationStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Initialize Resources
        const s3Bucket = new S3BucketResource(this);
        const beanstalk = new ElasticBeanstalkResource(this);
        const iam = new IAMResource(this);
        const lambda = new LambdaResource(this);
        const cloudfront = new CloudFrontResource(this);

        // S3 Buckets
        const myBucket = s3Bucket.create('MyBucket1', `${process.env.APP_NAME}-${process.env.NODE_ENV}-client1`.toLowerCase());

        // Create Elastic Beanstalk App & Env
        const ebApp1 = beanstalk.createApplication('MyElasticBeanstalkApp1', "kaito-eb-app-1");
        const instanceProfile1 = iam.createInstanceRole('MyBeanstalkInstanceRole1');
        const ebEnv1 = beanstalk.createEnvironment('MyElasticBeanstalkEnv1', ebApp1.applicationName!, instanceProfile1.ref);

       // Create Lambda Function
        const schemaCreatorLambda1 = lambda.createSchemaCreatorLambda('SchemaCreatorLambda1');

        // Outputs
        new cdk.CfnOutput(this, 'BucketName', { value: myBucket.bucketName });
        new cdk.CfnOutput(this, 'ElasticBeanstalkEnv1', { value: ebEnv1.ref });
        new cdk.CfnOutput(this, 'Lambda1', { value: schemaCreatorLambda1.functionName });
    }
}
