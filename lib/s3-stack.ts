import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { S3BucketResource } from './resources/s3';

// 🔹 Main Stack Definition
export class Kaitos3stack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // S3 Buckets
        const s3Bucket = new S3BucketResource(this, 'MyBucket1', {
            bucketName: `${process.env.APP_NAME}-${process.env.NODE_ENV}-client1`.toLowerCase(),
            versioned: true,
            publicReadAccess: false
        });


        // Outputs
        new cdk.CfnOutput(this, 'BucketName', { value: s3Bucket.bucketName });
    }
}
