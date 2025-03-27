import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';

interface LambdaProps {
    functionName: string;
    entryPath: string;
    environment?: { [key: string]: string };
}

export class LambdaFunction extends nodejs.NodejsFunction {
    constructor(scope: Construct, id: string, props: LambdaProps) {
        super(scope, id, {
            functionName: props.functionName,
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: 'handler',
            entry: props.entryPath,
            environment: props.environment || {}
        });
    }
}
