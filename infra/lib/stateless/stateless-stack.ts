import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaConstruct } from "./constructs/lambda";
import { S3Construct } from "./constructs/s3";
import { ApiGatewayConstruct } from "./constructs/apigateway";
import { StatelessStackProps } from "../types";

export class StatelessStack extends cdk.Stack {
  public apiGatewayConstruct: ApiGatewayConstruct;
  public s3Construct: S3Construct;
  public lambdaConstruct: LambdaConstruct;

  constructor(scope: Construct, id: string, props: StatelessStackProps) {
    super(scope, id, props);

    this.createS3Construct(props);
    this.createLambdaConstruct(props);
    this.createApiGatewayConstruct(props);
  }

  private createS3Construct(props: StatelessStackProps): void {
    this.s3Construct = new S3Construct(this, `${props.stage}-S3Construct`, {
      stage: props.stage,
    });
  }
  
  private createLambdaConstruct(props: StatelessStackProps): void {
    this.lambdaConstruct = new LambdaConstruct(
      this,
      `${props.stage}-LambdaConstruct`,
      {
        stage: props.stage,
        dataTable: props.dataTable,
      },
    );
  }
  
  private createApiGatewayConstruct(props: StatelessStackProps): void {
    this.apiGatewayConstruct = new ApiGatewayConstruct(
      this,
      `${props.stage}-ApiGatewayConstruct`,
      {
        stage: props.stage,
        addTodoIntegration: this.lambdaConstruct.addTodoIntegration,
      },
    );
  }
}
