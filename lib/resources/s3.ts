import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class S3BucketResource {
    scope: Construct;
    
    constructor(scope: Construct) {
        this.scope = scope;
    }

    create(id: string, bucketName: string) {
        return new s3.Bucket(this.scope, id, {
            bucketName, 
            versioned: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
    }
}
