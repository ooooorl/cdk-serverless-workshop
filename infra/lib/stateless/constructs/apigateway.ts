import * as api from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as authorizers from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import { Construct } from "constructs";
import { BaseConstructProps } from "../../types";

interface ApiGatewayConstructProps extends BaseConstructProps {
  addTodoIntegration: integrations.HttpLambdaIntegration;
}

export class ApiGatewayConstruct extends Construct {
  public api: api.HttpApi;
  private jwtAuthorizer: authorizers.HttpJwtAuthorizer;

  constructor(scope: Construct, id: string, props: ApiGatewayConstructProps) {
    super(scope, id);

    this.createApiGateway(props);
    this.createApiRoutes(props);
  }

  private createApiGateway(props: ApiGatewayConstructProps): void {
    this.api = new api.HttpApi(this, `${props.stage}-ApiGateway-HttpApi`, {
      apiName: `${props.stage}-ApiGateway-HttpApi`,
    });
  }
  
  private createApiRoutes(props: ApiGatewayConstructProps): void {
    this.api.addRoutes({
      path: "/todos",
      methods: [api.HttpMethod.POST],
      integration: props.addTodoIntegration,
    });
  }
}
