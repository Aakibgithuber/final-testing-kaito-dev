import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { S3BucketResource } from './resources/s3';

// 🔹 Main Stack Definition
export class Kaitos3stack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Initialize Resources
        const s3Bucket = new S3BucketResource(this);

        // S3 Buckets
        const myBucket = s3Bucket.create('MyBucket2', `${process.env.APP_NAME}-${process.env.NODE_ENV}-reports`.toLowerCase());

        // Outputs
        new cdk.CfnOutput(this, 'BucketName', { value: myBucket.bucketName });
    }
}
