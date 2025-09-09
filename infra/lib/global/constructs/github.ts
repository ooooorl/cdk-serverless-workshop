import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import { Construct } from "constructs";
import { BaseConstructProps } from "../../types";
import {
  GithubActionsIdentityProvider,
  GithubActionsRole,
} from "aws-cdk-github-oidc";

interface GithubConstructProps extends BaseConstructProps {
  frontendBucket: s3.Bucket;
  frontendDistribution: cloudfront.Distribution;
  apiDistribution: cloudfront.Distribution;
}

export class GithubConstruct extends Construct {
  public githubActionsRole: GithubActionsRole;

  constructor(scope: Construct, id: string, props: GithubConstructProps) {
    super(scope, id);

    this.createGithubActionsRole(props);
    this.addPolicies(props);
  }

  private createGithubActionsRole(props: GithubConstructProps): void {
    const githubActionsIdentityProvider = new GithubActionsIdentityProvider(
      this,
      `${props.stage}-GithubActionsIdentityProvider`,
    );

    this.githubActionsRole = new GithubActionsRole(
      this,
      `${props.stage}-GithubActionsRole`,
      {
        provider: githubActionsIdentityProvider,
        owner: "nbryleibanez",
        repo: "cdk-serverless-workshop",
        roleName: `${props.stage}-GithubActionsRole`,
        maxSessionDuration: cdk.Duration.hours(2),
      },
    );
  }

  private addPolicies(props: GithubConstructProps) {
    this.githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ["sts:AssumeRole"],
        effect: iam.Effect.ALLOW,
        resources: [`arn:aws:iam::*:role/cdk*`],
      }),
    );

    this.githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:ListBucket",
        ],
        effect: iam.Effect.ALLOW,
        resources: [
          props.frontendBucket.bucketArn,
          props.frontendBucket.arnForObjects("*"),
        ],
      }),
    );

    this.githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ["cloudfront:CreateInvalidation"],
        effect: iam.Effect.ALLOW,
        resources: [
          props.frontendDistribution.distributionArn,
          props.apiDistribution.distributionArn,
        ],
      }),
    );

    this.githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "lambda:CreateFunction",
          "lambda:UpdateFunctionCode",
          "lambda:UpdateFunctionConfiguration",
          "lambda:DeleteFunction",
          "lambda:GetFunction",
          "lambda:InvokeFunction",
          "lambda:AddPermission",
          "lambda:RemovePermission",
        ],
        resources: ["*"],
      }),
    );

    this.githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "apigateway:POST",
          "apigateway:GET",
          "apigateway:PUT",
          "apigateway:PATCH",
          "apigateway:DELETE",
        ],
        resources: ["*"],
      }),
    );

    this.githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "dynamodb:CreateTable",
          "dynamodb:UpdateTable",
          "dynamodb:DeleteTable",
          "dynamodb:DescribeTable",
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:DeleteItem",
          "dynamodb:UpdateItem",
        ],
        resources: ["*"],
      }),
    );

    this.githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "cloudformation:CreateChangeSet",
          "cloudformation:DescribeChangeSet",
          "cloudformation:DescribeStacks",
          "cloudformation:GetTemplate",
          "cloudformation:UpdateStack",
          "cloudformation:DeleteStack",
          "cloudformation:ExecuteChangeSet",
        ],
        resources: ["*"],
      }),
    );
  }
}
