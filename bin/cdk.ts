#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { KaitoApplicationStack } from '../lib/deploy-stack';
import { BackendApplicationStack } from '../lib/s3-stack';
import * as projectConfig from '../config/projectConfig.json';

const app = new cdk.App();
const tenantName = process.env.TENANT_NAME || 'default-tenant';

new KaitoApplicationStack(app, 'KaitoApplicationStack', {
  stackName: `${projectConfig.projectPrefix}-pipeline-stack`,
  env: {
    region: projectConfig.environments.DEV.region,
  },
});

// new BackendApplicationStack(app, `${tenantName}-BackendApplicationStack`, {
//   tenantName: tenantName,
//   stackName: `${projectConfig.projectPrefix}-${tenantName}-s3-creation-stack`,
//   env: {
//     region: projectConfig.environments.DEV.region,
//   },
// });
