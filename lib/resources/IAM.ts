import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class IAMResource {
    scope: Construct;

    constructor(scope: Construct) {
        this.scope = scope;
    }

    createInstanceRole(id: string): iam.CfnInstanceProfile {
        const instanceRole = new iam.Role(this.scope, `${id}-Role`, {
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess')
            ]
        });

        return new iam.CfnInstanceProfile(this.scope, `${id}-InstanceProfile`, {
            roles: [instanceRole.roleName]
        });
    }
}
