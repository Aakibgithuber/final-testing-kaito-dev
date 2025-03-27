import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';

export class LambdaResource {
    scope: Construct;

    constructor(scope: Construct) {
        this.scope = scope;
    }

    SchemaCreator(id: string): lambda.Function {
        return new nodejs.NodejsFunction(this.scope, id, {
            functionName: `${id}`,
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: 'handler',
            entry: 'lib/lambda/schema_creator.ts',
            environment: {
                DB_HOST: process.env.DB_HOST!,
                DB_DATABASE: process.env.DB_DATABASE!,
                DB_USER: process.env.DB_USER!,
                DB_PASSWORD: process.env.DB_PASSWORD!,
                DB_PORT: process.env.DB_PORT || '5432',
                DB_SCHEMA: process.env.DB_SCHEMA!
            }
        });
    }
}
