#!/usr/bin/env node

import * as cdk from "aws-cdk-lib";
import { setupStagingEnvironment } from "./environments/staging";
// import { setupProdEnvironment } from "./environments/prod";

const app = new cdk.App();

setupStagingEnvironment(app);
// setupProdEnvironment(app);
