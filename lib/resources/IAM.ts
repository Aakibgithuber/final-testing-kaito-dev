import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

interface IAMProps {
    roleName: string;
}

export class IAMInstanceProfile extends iam.CfnInstanceProfile {
    constructor(scope: Construct, id: string, props: IAMProps) {
        const instanceRole = new iam.Role(scope, props.roleName, {
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess')
            ]
        });

        super(scope, `${id}-InstanceProfile`, {
            roles: [instanceRole.roleName]
        });
    }
}
