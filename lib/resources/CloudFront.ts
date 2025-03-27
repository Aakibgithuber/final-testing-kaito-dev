import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

export class CloudFrontResource {
    scope: Construct;

    constructor(scope: Construct) {
        this.scope = scope;
    }

    createCloudFront(id: string, endpointUrl: string): cloudfront.Distribution {
        return new cloudfront.Distribution(this.scope, id, {
            defaultBehavior: {
                origin: new origins.HttpOrigin(endpointUrl),
                cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
            }
        });
    }
}
