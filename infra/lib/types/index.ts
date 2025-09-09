import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export interface BaseConstructProps {
  stage: string;
}

export interface BaseStackProps extends cdk.StackProps {
  stage: string;
}

export interface StatefulStackProps extends BaseStackProps {}

export interface StatelessStackProps extends BaseStackProps {
  dataTable: dynamodb.Table;
}

export interface GlobalStackProps extends BaseStackProps {
  apiEndpoint: string;
  frontendBucket: s3.Bucket;
}
