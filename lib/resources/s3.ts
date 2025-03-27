import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

interface S3Props {
    bucketName: string;
    versioned?: boolean;
    publicReadAccess?: boolean;
}

export class S3BucketResource extends s3.Bucket {
    constructor(scope: Construct, id: string, props: S3Props) {
        super(scope, id, {
            bucketName: props.bucketName,
            versioned: props.versioned ?? true,
            publicReadAccess: props.publicReadAccess ?? false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: cdk.RemovalPolicy.RETAIN,
            autoDeleteObjects: false
        });
    }
}
