import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";
import { BaseConstructProps } from "../../types";

interface DynamoDbConstructProps extends BaseConstructProps {}

export class DynamoDbConstruct extends Construct {
  public dataTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props: DynamoDbConstructProps) {
    super(scope, id);

    this.createDynamoDbTable(props);
  }

  private createDynamoDbTable(props: DynamoDbConstructProps): void {
    this.dataTable = new dynamodb.Table(this, `${props.stage}-DynamoDb-Data`, {
      tableName: `${props.stage}-DynamoDb-Data`,
      partitionKey: {
        name: "PK",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "SK",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy:
        props.stage == "prod" ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    });
  }
}
