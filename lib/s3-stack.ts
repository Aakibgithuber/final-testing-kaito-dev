// s3-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { S3BucketResource } from './resources/s3';

interface BackendStackProps extends cdk.StackProps {
  tenantName: string;
}

export class BackendApplicationStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: BackendStackProps) {
    super(scope, id, props);

    const { tenantName } = props;

    const bucketName = `kaito-prod-${tenantName}`.toLowerCase();

    const s3Bucket = new S3BucketResource(this, `s3-${tenantName}`, {
      bucketName: bucketName,
      versioned: true,
      publicReadAccess: false
    });

    new cdk.CfnOutput(this, 'BucketName', { value: s3Bucket.bucketName });
  }
}
