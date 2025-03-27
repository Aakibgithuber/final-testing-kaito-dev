import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

interface CloudFrontProps {
    endpointUrl: string;
}

export class CloudFrontDistribution extends cloudfront.Distribution {
    constructor(scope: Construct, id: string, props: CloudFrontProps) {
        super(scope, id, {
            defaultBehavior: {
                origin: new origins.HttpOrigin(props.endpointUrl),
                cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
            }
        });
    }
}
