import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { StatefulStackProps } from "../types";
import { DynamoDbConstruct } from "./constructs/dynamodb";

export class StatefulStack extends cdk.Stack {
  public dynamoDbConstruct: DynamoDbConstruct;

  constructor(scope: Construct, id: string, props: StatefulStackProps) {
    super(scope, id, props);

    // this.createDynamoDbConstruct(props);
  }

  // private createDynamoDbConstruct(props: StatefulStackProps): void {
  //   this.dynamoDbConstruct = new DynamoDbConstruct(
  //     this,
  //     `${props.stage}-DynamoDbConstruct`,
  //     {
  //       stage: props.stage,
  //     },
  //   );
  // }
}
