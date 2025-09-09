import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CloudfrontConstruct } from "./constructs/cloudfront";
import { GlobalStackProps } from "../types";
import { GithubConstruct } from "./constructs/github";

export class GlobalStack extends cdk.Stack {
  private cloudfrontConstruct: CloudfrontConstruct;
  private githubConstruct: GithubConstruct;

  constructor(scope: Construct, id: string, props: GlobalStackProps) {
    super(scope, id, props);

    this.createCloudfrontConstruct(props);
    this.createGithubConstruct(props);
  }

  private createCloudfrontConstruct(props: GlobalStackProps): void {
    this.cloudfrontConstruct = new CloudfrontConstruct(
      this,
      `${props.stage}-CloudfrontConstruct`,
      {
        stage: props.stage,
        apiEndpoint: props.apiEndpoint,
        frontendBucket: props.frontendBucket,
      },
    );
  }

  private createGithubConstruct(props: GlobalStackProps): void {
    this.githubConstruct = new GithubConstruct(
      this,
      `${props.stage}-GithubConstruct`,
      {
        stage: props.stage,
        frontendBucket: props.frontendBucket,
        frontendDistribution: this.cloudfrontConstruct.frontendDistribution,
        apiDistribution: this.cloudfrontConstruct.apiDistribution,
      },
    );
  }
}
