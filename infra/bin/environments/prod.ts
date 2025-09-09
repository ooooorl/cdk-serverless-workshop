import * as cdk from "aws-cdk-lib";
import ProdProps from "../../configs/staging";
import { setupEnvironment } from "./base";

export function setupProdEnvironment(app: cdk.App) {
  return setupEnvironment(app, ProdProps);
}
