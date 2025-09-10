import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";

import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";

interface S3ConstructProps {
  stage: string;
}

export class S3Construct extends Construct {
  public frontendBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: S3ConstructProps) {
    super(scope, id);

    // this.frontendBucket = this.createBucketWithRetry(
    //   `${props.stage}-Bucket-Frontend`,
    //   `${props.stage}-bucket-frontend-workshop`,
    //   true,
    // );
    //
    // this.createBucketPolicy(this.frontendBucket, props, "Frontend");
  }

  // private createBucketWithRetry(
  //   id: string,
  //   bucketName: string,
  //   publicReadAccess: boolean,
  // ): s3.Bucket {
  //   return new s3.Bucket(this, id, {
  //     bucketName: bucketName,
  //     blockPublicAccess: new s3.BlockPublicAccess({
  //       blockPublicAcls: false,
  //       blockPublicPolicy: false,
  //       ignorePublicAcls: false,
  //       restrictPublicBuckets: false,
  //     }),
  //     versioned: true,
  //     websiteErrorDocument: "index.html",
  //     websiteIndexDocument: "index.html",
  //     publicReadAccess: publicReadAccess,
  //     removalPolicy: RemovalPolicy.DESTROY,
  //     autoDeleteObjects: true,
  //   });
  // }
  //
  // private createBucketPolicy(
  //   bucket: s3.Bucket,
  //   props: S3ConstructProps,
  //   suffix: string,
  // ): void {
  //   const bucketPolicy = new s3.BucketPolicy(
  //     this,
  //     `${props.stage}-${suffix}BucketPolicy`,
  //     {
  //       bucket: bucket,
  //     },
  //   );
  //
  //   bucketPolicy.document.addStatements(
  //     new iam.PolicyStatement({
  //       actions: ["s3:GetObject"],
  //       resources: [bucket.arnForObjects("*")],
  //       principals: [new iam.AnyPrincipal()],
  //     }),
  //   );
  // }
}
