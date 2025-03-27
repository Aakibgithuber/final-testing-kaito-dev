import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as elasticbeanstalk from 'aws-cdk-lib/aws-elasticbeanstalk';
import { elasticBeanstalkConfig } from '../eb-config';

export class ElasticBeanstalkResource {
    scope: Construct;

    constructor(scope: Construct) {
        this.scope = scope;
    }

    createApplication(id: string, appName: string): elasticbeanstalk.CfnApplication {
        return new elasticbeanstalk.CfnApplication(this.scope, id, {
            applicationName: appName
        });
    }

    createEnvironment(id: string, appName: string, instanceProfileRef: string): elasticbeanstalk.CfnEnvironment {
        return new elasticbeanstalk.CfnEnvironment(this.scope, id, {
            environmentName: `${appName}-env`,
            applicationName: appName,
            platformArn: "arn:aws:elasticbeanstalk:ap-south-1::platform/Docker running on 64bit Amazon Linux 2023/4.4.4",
            optionSettings: [
                ...elasticBeanstalkConfig,
                {
                    namespace: 'aws:autoscaling:launchconfiguration',
                    optionName: 'IamInstanceProfile',
                    value: instanceProfileRef
                }
            ]
        });
    }
}
