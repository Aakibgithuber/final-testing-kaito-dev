import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { S3BucketResource } from './resources/s3';
import { ElasticBeanstalkResource } from './resources/ElasticBeanstalk';
import { IAMInstanceProfile } from './resources/IAM';
import { LambdaFunction } from './resources/Lambda';
import { CloudFrontDistribution } from './resources/CloudFront';
import * as dotenv from 'dotenv';

dotenv.config();

export class KaitoApplicationStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // S3 Bucket
        const s3Bucket = new S3BucketResource(this, 'MyBucket1', {
            bucketName: `${process.env.APP_NAME}-${process.env.NODE_ENV}-client1`.toLowerCase(),
            versioned: true,
            publicReadAccess: false
        });

        // IAM Role & Instance Profile
        const instanceProfile1 = new IAMInstanceProfile(this, 'MyBeanstalkInstanceRole1', {
            roleName: 'MyBeanstalkRole1'
        });

        // Elastic Beanstalk
        const ebApp1 = new ElasticBeanstalkResource(this, 'MyElasticBeanstalkApp1', {
            appName: "kaito-eb-app-1",
            instanceProfileRef: instanceProfile1.ref
        });

        // Lambda Function
        // const schemaCreatorLambda1 = new LambdaFunction(this, 'SchemaCreatorLambda1', {
        //     functionName: 'SchemaCreatorLambda',
        //     entryPath: 'lib/lambda/schema_creator.ts',
        //     environment: {
        //         DB_HOST: process.env.DB_HOST!,
        //         DB_DATABASE: process.env.DB_DATABASE!,
        //         DB_USER: process.env.DB_USER!,
        //         DB_PASSWORD: process.env.DB_PASSWORD!,
        //         DB_PORT: process.env.DB_PORT || '5432',
        //         DB_SCHEMA: process.env.DB_SCHEMA!
        //     }
        // });

        // Outputs
        new cdk.CfnOutput(this, 'BucketName', { value: s3Bucket.bucketName });
        new cdk.CfnOutput(this, 'ElasticBeanstalkEnv1', { value: ebApp1.applicationName! });
        new cdk.CfnOutput(this, 'Lambda1', { value: schemaCreatorLambda1.functionName });
    }
}
