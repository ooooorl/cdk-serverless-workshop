import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CloudfrontConstruct } from "./constructs/cloudfront";
import { GlobalStackProps } from "../types";

export class GlobalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GlobalStackProps) {
    super(scope, id, props);

    this.createCloudfrontConstruct(props);
  }

  private createCloudfrontConstruct(props: GlobalStackProps): void {
    new CloudfrontConstruct(this, `${props.stage}-CloudfrontConstruct`, {
      stage: props.stage,
      apiEndpoint: props.apiEndpoint,
      frontendBucket: props.frontendBucket,
    });
  }
}
