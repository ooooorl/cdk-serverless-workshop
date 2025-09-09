import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as path from "path";

import { Construct } from "constructs";

interface LambdaConstructProps {
  stage: string;
  dataTable: dynamodb.Table;
}

interface CreateFunctionProps {
  functionName: string;
  environment?: { [key: string]: string };
  enableParameterStore?: boolean;
}

export class LambdaConstruct extends Construct {
  public addTodoLambda: lambda.Function;
  public getTodoLambda: lambda.Function;
  public getTodosLambda: lambda.Function;
  public updateTodoLambda: lambda.Function;
  public deleteTodoLambda: lambda.Function;

  public addTodoIntegration: integrations.HttpLambdaIntegration;
  public getTodoIntegration: integrations.HttpLambdaIntegration;
  public getTodosIntegration: integrations.HttpLambdaIntegration;
  public updateTodoIntegration: integrations.HttpLambdaIntegration;
  public deleteTodoIntegration: integrations.HttpLambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaConstructProps) {
    super(scope, id);

    this.createLambdas(props);
    this.createLambdaIntegrations(props);
  }

  private createLambdas(props: LambdaConstructProps): void {
    this.addTodoLambda = this.createFunction(props, {
      functionName: "addTodo",
      environment: {
        TABLE_NAME: props.dataTable.tableName,
      },
    });

    this.getTodoLambda = this.createFunction(props, {
      functionName: "getTodo",
      environment: {
        TABLE_NAME: props.dataTable.tableName,
      },
    });

    this.getTodosLambda = this.createFunction(props, {
      functionName: "getTodos",
      environment: {
        TABLE_NAME: props.dataTable.tableName,
      },
    });

    this.updateTodoLambda = this.createFunction(props, {
      functionName: "updateTodo",
      environment: {
        TABLE_NAME: props.dataTable.tableName,
      },
    });

    this.deleteTodoLambda = this.createFunction(props, {
      functionName: "deleteTodo",
      environment: {
        TABLE_NAME: props.dataTable.tableName,
      },
    });
  }

  private createLambdaIntegrations(props: LambdaConstructProps): void {
    this.addTodoIntegration = new integrations.HttpLambdaIntegration(
      `${props.stage}-LambdaIntegration-addTodo`,
      this.addTodoLambda,
    );

    this.getTodoIntegration = new integrations.HttpLambdaIntegration(
      `${props.stage}-LambdaIntegration-getTodo`,
      this.getTodoLambda,
    );

    this.getTodosIntegration = new integrations.HttpLambdaIntegration(
      `${props.stage}-LambdaIntegration-getTodos`,
      this.getTodosLambda,
    );

    this.updateTodoIntegration = new integrations.HttpLambdaIntegration(
      `${props.stage}-LambdaIntegration-updateTodo`,
      this.updateTodoLambda,
    );

    this.deleteTodoIntegration = new integrations.HttpLambdaIntegration(
      `${props.stage}-LambdaIntegration-deleteTodo`,
      this.deleteTodoLambda,
    );
  }

  private createFunction(
    props: LambdaConstructProps,
    functionProps: CreateFunctionProps,
  ): lambda.Function {
    const lambdaFunction = new lambda.Function(
      this,
      `${props.stage}-${functionProps.functionName}`,
      {
        runtime: lambda.Runtime.NODEJS_22_X,
        functionName: functionProps.functionName,
        handler: `index.handler`,
        code: lambda.Code.fromAsset(
          path.join(
            __dirname,
            `../../../../lambdas/handlers/${functionProps.functionName}`,
          ),
        ),
        memorySize: 1024,
        environment: functionProps.environment || {},
        architecture: lambda.Architecture.ARM_64,
      },
    );

    this.addPermissions(props, lambdaFunction, functionProps);
    return lambdaFunction;
  }

  private addPermissions(
    props: LambdaConstructProps,
    lambdaFunction: lambda.Function,
    functionProps: CreateFunctionProps,
  ) {
    props.dataTable.grantReadWriteData(lambdaFunction);

    if (functionProps.enableParameterStore) {
      const parameterStorePolicy = new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "ssm:GetParameter",
          "ssm:GetParameters",
          "ssm:GetParametersByPath",
        ],
        resources: [`arn:aws:ssm:*:*:parameter/${props.stage}/*`],
      });

      lambdaFunction.addToRolePolicy(parameterStorePolicy);
    }
  }
}
