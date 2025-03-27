import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as elasticbeanstalk from 'aws-cdk-lib/aws-elasticbeanstalk';
import { elasticBeanstalkConfig } from '../eb-config';

interface ElasticBeanstalkProps {
    appName: string;
    instanceProfileRef: string;
}

export class ElasticBeanstalkResource extends elasticbeanstalk.CfnApplication {
    constructor(scope: Construct, id: string, props: ElasticBeanstalkProps) {
        super(scope, id, { applicationName: props.appName });

        new elasticbeanstalk.CfnEnvironment(scope, `${id}-Env`, {
            environmentName: `${props.appName}-env`,
            applicationName: props.appName,
            platformArn: "arn:aws:elasticbeanstalk:ap-south-1::platform/Docker running on 64bit Amazon Linux 2023/4.4.4",
            optionSettings: [
                ...elasticBeanstalkConfig,
                {
                    namespace: 'aws:autoscaling:launchconfiguration',
                    optionName: 'IamInstanceProfile',
                    value: props.instanceProfileRef
                }
            ]
        });
    }
}
