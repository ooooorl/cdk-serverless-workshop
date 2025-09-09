import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";
import { BaseConstructProps } from "../../types";

interface CloudfrontConstructProps extends BaseConstructProps {
  apiEndpoint: string;
  frontendBucket: s3.Bucket;
}

export class CloudfrontConstruct extends Construct {
  constructor(scope: Construct, id: string, props: CloudfrontConstructProps) {
    super(scope, id);

    this.createFrontendDistribution(props);
    this.createApiDistribution(props);
  }

  private createFrontendDistribution(props: CloudfrontConstructProps): void {
    new cloudfront.Distribution(
      this,
      `${props.stage}-Cloudfront-Distribution-Frontend`,
      {
        defaultBehavior: {
          origin: new origins.S3StaticWebsiteOrigin(props.frontendBucket),
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      },
    );
  }

  private createApiDistribution(props: CloudfrontConstructProps): void {
    new cloudfront.Distribution(
      this,
      `${props.stage}-Cloudfront-Distribution-Api`,
      {
        defaultBehavior: {
          origin: new origins.HttpOrigin(
            cdk.Fn.select(2, cdk.Fn.split("/", props.apiEndpoint)),
            {
              originPath: "/",
            },
          ),
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          originRequestPolicy:
            cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
        },
      },
    );
  }
}
