#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { KaitoApplicationStack } from '../lib/deploy-stack';
import { Kaitos3stack } from '../lib/s3-stack';
import * as projectConfig from '../config/projectConfig.json';

const app = new cdk.App();

new KaitoApplicationStack(app, 'KaitoApplicationStack', {
  stackName: `${projectConfig.projectPrefix}-pipeline-stack`,
  env: {
    region: projectConfig.environments.DEV.region,
  },
});

new Kaitos3stack(app, 'Kaitos3stack', {
  stackName: `${projectConfig.projectPrefix}-s3-creation-stack`,
  env: {
    region: projectConfig.environments.DEV.region,
  },
});
